
// =========================================================
// ITEM PEDIDO REPOSITORY
// =========================================================

const db = require("../database/sqlite/connection");

// =========================================================
// LISTAR TODOS
// =========================================================

async function listarTodos() {
  const sql = `
    SELECT
      i.id,
      i.pedido_id,
      i.produto_id,
      p.nome AS produto,
      i.quantidade,
      i.preco_unitario,
      i.subtotal
    FROM itens_pedido i
    LEFT JOIN produtos p
      ON p.id = i.produto_id
    ORDER BY i.id
  `;

  return db.all(sql);
}

// =========================================================
// BUSCAR POR ID
// =========================================================

async function buscarPorId(id) {
  const sql = `
    SELECT
      i.id,
      i.pedido_id,
      i.produto_id,
      p.nome AS produto,
      i.quantidade,
      i.preco_unitario,
      i.subtotal
    FROM itens_pedido i
    LEFT JOIN produtos p
      ON p.id = i.produto_id
    WHERE i.id = ?
  `;

  return db.get(sql, [id]);
}

// =========================================================
// CRIAR
// =========================================================

async function criar(item) {
  const sql = `
    INSERT INTO itens_pedido (
      pedido_id,
      produto_id,
      quantidade,
      preco_unitario,
      subtotal
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [
    item.pedido_id,
    item.produto_id,
    item.quantidade,
    item.preco_unitario,
    item.subtotal,
  ];

  const result = await db.run(sql, params);

  return {
    id: result.lastID,
    ...item,
  };
}

// =========================================================
// ATUALIZAR
// =========================================================

async function atualizar(id, item) {
  const sql = `
    UPDATE itens_pedido
    SET
      pedido_id = ?,
      produto_id = ?,
      quantidade = ?,
      preco_unitario = ?,
      subtotal = ?
    WHERE id = ?
  `;

  const params = [
    item.pedido_id,
    item.produto_id,
    item.quantidade,
    item.preco_unitario,
    item.subtotal,
    id,
  ];

  return db.run(sql, params);
}

// =========================================================
// EXCLUIR
// =========================================================

async function excluir(id) {
  const sql = `
    DELETE FROM itens_pedido
    WHERE id = ?
  `;

  return db.run(sql, [id]);
}

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};

