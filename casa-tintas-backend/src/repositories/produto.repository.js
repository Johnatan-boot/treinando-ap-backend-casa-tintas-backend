
// =========================================================
// PRODUTO REPOSITORY
// =========================================================

const db = require("../database/sqlite/connection");

// =========================================================
// LISTAR TODOS
// =========================================================

async function listarTodos() {
  const sql = `
    SELECT
      p.id,
      p.nome,
      p.descricao,
      p.quantidade,
      p.preco,
      p.imagem,
      p.categoria_id,
      c.nome AS categoria
    FROM produtos p
    LEFT JOIN categorias c
      ON c.id = p.categoria_id
    ORDER BY p.id
  `;

  return db.all(sql);
}

// =========================================================
// BUSCAR POR ID
// =========================================================

async function buscarPorId(id) {
  const sql = `
    SELECT
      p.id,
      p.nome,
      p.descricao,
      p.quantidade,
      p.preco,
      p.imagem,
      p.categoria_id,
      c.nome AS categoria
    FROM produtos p
    LEFT JOIN categorias c
      ON c.id = p.categoria_id
    WHERE p.id = ?
  `;

  return db.get(sql, [id]);
}

// =========================================================
// CRIAR PRODUTO
// =========================================================

async function criar(produto) {
  const sql = `
    INSERT INTO produtos (
      nome,
      descricao,
      quantidade,
      preco,
      imagem,
      categoria_id
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const params = [
    produto.nome,
    produto.descricao,
    produto.quantidade,
    produto.preco,
    produto.imagem,
    produto.categoria_id,
  ];

  const result = await db.run(sql, params);

  return {
    id: result.lastID,
    ...produto,
  };
}

// =========================================================
// ATUALIZAR PRODUTO
// =========================================================

async function atualizar(id, produto) {
  const sql = `
    UPDATE produtos
    SET
      nome = ?,
      descricao = ?,
      quantidade = ?,
      preco = ?,
      imagem = ?,
      categoria_id = ?
    WHERE id = ?
  `;

  const params = [
    produto.nome,
    produto.descricao,
    produto.quantidade,
    produto.preco,
    produto.imagem,
    produto.categoria_id,
    id,
  ];

  return db.run(sql, params);
}

// =========================================================
// EXCLUIR PRODUTO
// =========================================================

async function excluir(id) {
  const sql = `
    DELETE FROM produtos
    WHERE id = ?
  `;

  return db.run(sql, [id]);
}

// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};

