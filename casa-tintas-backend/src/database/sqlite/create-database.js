const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dataDirectory = path.join(__dirname, "../../../data");

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const databasePath = path.join(
  dataDirectory,
  "casa-tintas.sqlite"
);

const db = new sqlite3.Database(databasePath);

db.serialize(() => {
  console.log("Criando banco SQLite...");

  db.run(`PRAGMA foreign_keys = ON`);

  // =====================================================
  // COMERCIO
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS comercio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL,
      expediente TEXT,
      ceo TEXT,
      cnpj TEXT UNIQUE
    )
  `);

  // =====================================================
  // CATEGORIAS
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL UNIQUE,
      descricao TEXT
    )
  `);

  // =====================================================
  // FUNCIONARIOS
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      profissao TEXT,
      carga_horaria TEXT,
      salario NUMERIC NOT NULL DEFAULT 0,
      ativo INTEGER NOT NULL DEFAULT 1
    )
  `);

  // =====================================================
  // FUNCIONARIO_CATEGORIA
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS funcionario_categorias (
      funcionario_id INTEGER NOT NULL,
      categoria_id INTEGER NOT NULL,

      PRIMARY KEY (
        funcionario_id,
        categoria_id
      ),

      FOREIGN KEY (funcionario_id)
        REFERENCES funcionarios(id)
        ON DELETE CASCADE,

      FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE CASCADE
    )
  `);

  // =====================================================
  // PRODUTOS
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      quantidade INTEGER NOT NULL DEFAULT 0,
      preco NUMERIC NOT NULL DEFAULT 0,
      categoria_id INTEGER,
      imagem TEXT,
      ativo INTEGER NOT NULL DEFAULT 1,

      FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE SET NULL
    )
  `);

  // =====================================================
  // CLIENTES
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telefone TEXT
    )
  `);

  // =====================================================
  // ENDERECOS
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS enderecos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      cliente_id INTEGER NOT NULL,

      cep TEXT NOT NULL,
      logradouro TEXT NOT NULL,
      numero TEXT NOT NULL,
      complemento TEXT,
      bairro TEXT NOT NULL,
      cidade TEXT NOT NULL,
      estado TEXT NOT NULL,

      FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE CASCADE
    )
  `);

  // =====================================================
  // PEDIDOS
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      cliente_id INTEGER NOT NULL,
      endereco_id INTEGER NOT NULL,

      status TEXT NOT NULL DEFAULT 'aguardando_pagamento',

      subtotal NUMERIC NOT NULL DEFAULT 0,
      frete NUMERIC NOT NULL DEFAULT 0,
      total NUMERIC NOT NULL DEFAULT 0,

      criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (cliente_id)
        REFERENCES clientes(id),

      FOREIGN KEY (endereco_id)
        REFERENCES enderecos(id)
    )
  `);

  // =====================================================
  // ITENS DO PEDIDO
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS itens_pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      pedido_id INTEGER NOT NULL,
      produto_id INTEGER NOT NULL,

      quantidade INTEGER NOT NULL,
      preco_unitario NUMERIC NOT NULL,
      subtotal NUMERIC NOT NULL,

      FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE,

      FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
    )
  `);

  // =====================================================
  // PAGAMENTOS
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS pagamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      pedido_id INTEGER NOT NULL,

      metodo TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pendente',

      valor NUMERIC NOT NULL DEFAULT 0,

      criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE
    )
  `);

  // =====================================================
  // ENTREGAS
  // =====================================================

  db.run(`
    CREATE TABLE IF NOT EXISTS entregas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      pedido_id INTEGER NOT NULL UNIQUE,

      servico TEXT,
      prazo INTEGER,
      valor NUMERIC NOT NULL DEFAULT 0,
      codigo_rastreamento TEXT,

      status TEXT NOT NULL DEFAULT 'aguardando',

      FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE
    )
  `);

  // =====================================================
  // INDICES
  // =====================================================

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_produtos_categoria
    ON produtos(categoria_id)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_pedidos_cliente
    ON pedidos(cliente_id)
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_itens_pedido
    ON itens_pedido(pedido_id)
  `);

  console.log("Banco SQLite criado com sucesso.");
});

db.close((error) => {
  if (error) {
    console.error("Erro ao fechar SQLite:", error);
    process.exit(1);
  }

  console.log(`Banco localizado em: ${databasePath}`);
});