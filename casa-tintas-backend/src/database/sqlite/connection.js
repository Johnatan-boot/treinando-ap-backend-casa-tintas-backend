
// =========================================================
// SQLITE — CONEXÃO COM O BANCO
// =========================================================

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// =========================================================
// CAMINHO DO BANCO
// =========================================================

const databasePath = path.join(
  __dirname,
  "../../../data/casa-tintas.sqlite"
);

// =========================================================
// CONEXÃO
// =========================================================

const db = new sqlite3.Database(
  databasePath,
  (error) => {
    if (error) {
      console.error("Erro ao conectar ao SQLite:");
      console.error(error);
      return;
    }

    console.log("Conectado ao SQLite com sucesso.");
    console.log(`Banco: ${databasePath}`);
  }
);

// =========================================================
// CONFIGURAÇÕES
// =========================================================

db.configure("busyTimeout", 5000);

// =========================================================
// DB.RUN — VERSÃO COM PROMISE
// =========================================================

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        changes: this.changes,
        lastID: this.lastID,
      });
    });
  });
};

// =========================================================
// DB.GET — VERSÃO COM PROMISE
// =========================================================

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row || null);
    });
  });
};

// =========================================================
// DB.ALL — VERSÃO COM PROMISE
// =========================================================

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
};

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  run,
  get,
  all,
  close: () => {
    return new Promise((resolve, reject) => {
      db.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  },
};

