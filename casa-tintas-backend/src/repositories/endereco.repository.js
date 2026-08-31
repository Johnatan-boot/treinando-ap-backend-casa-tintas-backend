// =========================================================
// ENDEREÇO REPOSITORY
// =========================================================

const db = require("../database/sqlite/connection");

// =========================================================
// LISTAR TODOS
// =========================================================

function listarTodos() {
  return db.all(
    `
      SELECT
        e.id,
        e.cliente_id,
        c.nome AS cliente,
        e.cep,
        e.logradouro,
        e.numero,
        e.complemento,
        e.bairro,
        e.cidade,
        e.estado
      FROM enderecos e
      INNER JOIN clientes c
        ON c.id = e.cliente_id
      ORDER BY e.id
    `
  );
}

// =========================================================
// BUSCAR POR ID
// =========================================================

function buscarPorId(id) {
  return db.get(
    `
      SELECT
        e.id,
        e.cliente_id,
        c.nome AS cliente,
        e.cep,
        e.logradouro,
        e.numero,
        e.complemento,
        e.bairro,
        e.cidade,
        e.estado
      FROM enderecos e
      INNER JOIN clientes c
        ON c.id = e.cliente_id
      WHERE e.id = ?
    `,
    [id]
  );
}

// =========================================================
// CRIAR
// =========================================================

function criar(endereco) {
  return db.run(
    `
      INSERT INTO enderecos (
        cliente_id,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      endereco.cliente_id,
      endereco.cep,
      endereco.logradouro,
      endereco.numero,
      endereco.complemento,
      endereco.bairro,
      endereco.cidade,
      endereco.estado,
    ]
  );
}

// =========================================================
// ATUALIZAR
// =========================================================

function atualizar(id, endereco) {
  return db.run(
    `
      UPDATE enderecos
      SET
        cliente_id = ?,
        cep = ?,
        logradouro = ?,
        numero = ?,
        complemento = ?,
        bairro = ?,
        cidade = ?,
        estado = ?
      WHERE id = ?
    `,
    [
      endereco.cliente_id,
      endereco.cep,
      endereco.logradouro,
      endereco.numero,
      endereco.complemento,
      endereco.bairro,
      endereco.cidade,
      endereco.estado,
      id,
    ]
  );
}

// =========================================================
// EXCLUIR
// =========================================================

function excluir(id) {
  return db.run(
    `
      DELETE FROM enderecos
      WHERE id = ?
    `,
    [id]
  );
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