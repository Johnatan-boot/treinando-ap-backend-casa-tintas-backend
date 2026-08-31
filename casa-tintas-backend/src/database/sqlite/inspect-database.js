const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const databasePath = path.join(
  __dirname,
  "../../../data/casa-tintas.sqlite"
);

const db = new sqlite3.Database(databasePath);

db.serialize(() => {
  console.log("\n======================================");
  console.log(" BANCO CASA DE TINTAS — SQLITE");
  console.log("======================================\n");

  // =====================================================
  // TABELAS
  // =====================================================

  db.all(
    `
      SELECT name
      FROM sqlite_master
      WHERE type = 'table'
      ORDER BY name
    `,
    [],
    (error, tables) => {
      if (error) {
        console.error("Erro ao consultar tabelas:", error);
        return;
      }

      console.log("TABELAS:");

      tables.forEach((table) => {
        console.log(`- ${table.name}`);
      });

      console.log("");
    }
  );

  // =====================================================
  // COMERCIO
  // =====================================================

  db.all(
    `SELECT * FROM comercio`,
    [],
    (error, rows) => {
      if (error) {
        console.error("Erro em comercio:", error);
        return;
      }

      console.log("COMERCIO:");
      console.table(rows);
    }
  );

  // =====================================================
  // CATEGORIAS
  // =====================================================

  db.all(
    `SELECT * FROM categorias`,
    [],
    (error, rows) => {
      if (error) {
        console.error("Erro em categorias:", error);
        return;
      }

      console.log("CATEGORIAS:");
      console.table(rows);
    }
  );

  // =====================================================
  // FUNCIONARIOS
  // =====================================================

  db.all(
    `SELECT * FROM funcionarios`,
    [],
    (error, rows) => {
      if (error) {
        console.error("Erro em funcionarios:", error);
        return;
      }

      console.log("FUNCIONARIOS:");
      console.table(rows);
    }
  );

  // =====================================================
  // PRODUTOS
  // =====================================================

  db.all(
    `
      SELECT
        p.id,
        p.nome,
        p.quantidade,
        p.preco,
        c.nome AS categoria,
        p.imagem
      FROM produtos p
      LEFT JOIN categorias c
        ON c.id = p.categoria_id
      ORDER BY p.id
    `,
    [],
    (error, rows) => {
      if (error) {
        console.error("Erro em produtos:", error);
        return;
      }

      console.log("PRODUTOS:");
      console.table(rows);
    }
  );
});

db.close((error) => {
  if (error) {
    console.error("Erro ao fechar banco:", error);
    return;
  }

  console.log("\n======================================");
  console.log(" Consulta finalizada.");
  console.log("======================================\n");
});