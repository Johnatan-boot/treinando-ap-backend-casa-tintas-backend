
// =========================================================
// CLIENTE REPOSITORY
// =========================================================

const db = require("../database/sqlite/connection");

// =========================================================
// LISTAR TODOS
// =========================================================

async function listarTodos() {
  const sql = `
    SELECT
      id,
      nome,
      email,
      telefone
    FROM clientes
    ORDER BY id
  `;

  return db.all(sql);
}

// =========================================================
// BUSCAR POR ID
// =========================================================

async function buscarPorId(id) {
  const sql = `
    SELECT
      id,
      nome,
      email,
      telefone
    FROM clientes
    WHERE id = ?
  `;

  return db.get(sql, [id]);
}

// =========================================================
// CRIAR
// =========================================================

async function criar(cliente) {
  const sql = `
    INSERT INTO clientes (
      nome,
      email,
      telefone
    )
    VALUES (?, ?, ?)
  `;

  const params = [
    cliente.nome,
    cliente.email,
    cliente.telefone,
  ];

  const result = await db.run(sql, params);

  return {
    id: result.lastID,
    ...cliente,
  };
}

// =========================================================
// ATUALIZAR
// =========================================================

async function atualizar(id, cliente) {
  const sql = `
    UPDATE clientes
    SET
      nome = ?,
      email = ?,
      telefone = ?
    WHERE id = ?
  `;

  const params = [
    cliente.nome,
    cliente.email,
    cliente.telefone,
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
    DELETE FROM clientes
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
