// =========================================================
// PEDIDO REPOSITORY
// =========================================================

const db = require("../database/sqlite/connection");

// =========================================================
// LISTAR TODOS
// =========================================================

async function listarTodos() {
  const sql = `
    SELECT
      p.id,
      p.cliente_id,
      c.nome AS cliente,
      p.endereco_id,
      p.status,
      p.subtotal,
      p.frete,
      p.total,
      p.criado_em
    FROM pedidos p
    INNER JOIN clientes c
      ON c.id = p.cliente_id
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
      p.cliente_id,
      c.nome AS cliente,
      p.endereco_id,
      p.status,
      p.subtotal,
      p.frete,
      p.total,
      p.criado_em
    FROM pedidos p
    INNER JOIN clientes c
      ON c.id = p.cliente_id
    WHERE p.id = ?
  `;

  return db.get(sql, [id]);
}

// =========================================================
// CRIAR
// =========================================================

async function criar(pedido) {
  const sql = `
    INSERT INTO pedidos (
      cliente_id,
      endereco_id,
      status,
      subtotal,
      frete,
      total
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const params = [
    pedido.cliente_id,
    pedido.endereco_id,
    pedido.status,
    pedido.subtotal,
    pedido.frete,
    pedido.total,
  ];

  const result = await db.run(sql, params);

  return {
    id: result.lastID,
    ...pedido,
  };
}

// =========================================================
// ATUALIZAR
// =========================================================

async function atualizar(id, pedido) {
  const sql = `
    UPDATE pedidos
    SET
      cliente_id = ?,
      endereco_id = ?,
      status = ?,
      subtotal = ?,
      frete = ?,
      total = ?
    WHERE id = ?
  `;

  const params = [
    pedido.cliente_id,
    pedido.endereco_id,
    pedido.status,
    pedido.subtotal,
    pedido.frete,
    pedido.total,
    id,
  ];

  const result = await db.run(sql, params);

  return result.changes;
}

// =========================================================
// EXCLUIR
// =========================================================

async function excluir(id) {
  const sql = `
    DELETE FROM pedidos
    WHERE id = ?
  `;

  const result = await db.run(sql, [id]);

  return result.changes;
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