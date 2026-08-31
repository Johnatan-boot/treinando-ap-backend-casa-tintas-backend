const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const databasePath = path.join(
  __dirname,
  "../../../data/casa-tintas.sqlite"
);

const db = new sqlite3.Database(databasePath);

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");

  // =====================================================
  // COMERCIO
  // =====================================================

  db.run(
    `
      INSERT OR IGNORE INTO comercio
      (id, nome, tipo, expediente, ceo, cnpj)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      1,
      "Casa de Tintas Aquarela",
      "Loja de Tintas",
      "Segunda a Sexta: 8h às 18h",
      "Johnatan Santos",
      "12.345.678/0001-90"
    ]
  );

  // =====================================================
  // CATEGORIAS
  // =====================================================

  const categorias = [
    ["Residencial", "Produtos para ambientes residenciais."],
    ["Industrial", "Produtos para aplicações industriais."],
    ["Moveleiro", "Produtos para móveis e madeira."],
    ["Automotivo", "Produtos para aplicações automotivas."],
    ["Econômica", "Linha econômica."],
    ["Standard", "Linha standard."],
    ["Premium", "Linha premium."],
    ["Interior", "Tintas para ambientes internos."]
  ];

  const categoriaStatement = db.prepare(`
    INSERT OR IGNORE INTO categorias
    (nome, descricao)
    VALUES (?, ?)
  `);

  categorias.forEach(([nome, descricao]) => {
    categoriaStatement.run(nome, descricao);
  });

  categoriaStatement.finalize();

  // =====================================================
  // FUNCIONARIOS
  // =====================================================

  const funcionarios = [
    [
      1,
      "Marcio Silva",
      "123.456.789-00",
      "Colorista",
      "44 horas semanais",
      2500
    ],
    [
      2,
      "Ana Souza",
      "987.654.321-00",
      "Vendedora",
      "44 horas semanais",
      2300
    ]
  ];

  const funcionarioStatement = db.prepare(`
    INSERT OR IGNORE INTO funcionarios
    (
      id,
      nome,
      cpf,
      profissao,
      carga_horaria,
      salario
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  funcionarios.forEach((funcionario) => {
    funcionarioStatement.run(funcionario);
  });

  funcionarioStatement.finalize();

  // =====================================================
  // PRODUTOS
  // =====================================================

  const produtos = [
    [
      1,
      "Tinta Acrílica Interior Coralar",
      "Tinta para uso em ambientes residenciais internos.",
      100,
      109.90,
      "Econômica",
      "/assets/coralar.png"
    ],
    [
      2,
      "Tinta Acrílica Exterior Coral Rende Muito",
      "Tinta para uso em ambientes residenciais externos.",
      100,
      109.90,
      "Standard",
      "/assets/super-lavavel.png"
    ],
    [
      3,
      "Tinta Premium Fosca",
      "Alta cobertura e acabamento sofisticado.",
      50,
      189.90,
      "Premium",
      "/assets/master-fosco.png"
    ],
    [
      4,
      "Tinta Super Lavável",
      "Ideal para ambientes de alto uso.",
      45,
      219.90,
      "Premium",
      "/assets/super-lavavel.png"
    ],
    [
      5,
      "Esmalte Premium",
      "Proteção e brilho para madeira e metal.",
      70,
      89.90,
      "Premium",
      "/assets/coralit-premium.png"
    ],
    [
      6,
      "Textura Decorativa",
      "Crie paredes com personalidade.",
      50,
      119.90,
      "Standard",
      "/assets/grafiato.png"
    ],
    [
      7,
      "Grafiato Premium",
      "Revestimento texturizado para ambientes internos e externos.",
      35,
      149.90,
      "Premium",
      "/assets/grafiato.png"
    ],
    [
      8,
      "Massa Corrida",
      "Para nivelamento e acabamento de paredes internas.",
      80,
      59.90,
      "Econômica",
      "/assets/grafiato.png"
    ]
  ];

  db.all(
    `SELECT id, nome FROM categorias`,
    [],
    (error, rows) => {
      if (error) {
        console.error(error);
        return;
      }

      const categoriaMap = {};

      rows.forEach((row) => {
        categoriaMap[row.nome] = row.id;
      });

      const produtoStatement = db.prepare(`
        INSERT OR IGNORE INTO produtos
        (
          id,
          nome,
          descricao,
          quantidade,
          preco,
          categoria_id,
          imagem
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      produtos.forEach((produto) => {
        const [
          id,
          nome,
          descricao,
          quantidade,
          preco,
          categoria,
          imagem
        ] = produto;

        produtoStatement.run(
          id,
          nome,
          descricao,
          quantidade,
          preco,
          categoriaMap[categoria] || null,
          imagem
        );
      });

      produtoStatement.finalize();

      console.log("Seed executado com sucesso.");

      db.close();
    }
  );
});