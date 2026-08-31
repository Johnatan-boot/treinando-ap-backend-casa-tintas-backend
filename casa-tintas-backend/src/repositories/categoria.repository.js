
// =========================================================
// CLIENTE REPOSITORY
// =========================================================

const db = require("../database/sqlite/connection");

// =========================================================
// LISTAR TODOS
// =========================================================

function listarTodos() {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        nome,
        email,
        telefone
      FROM clientes
      ORDER BY id
    `;

    db.all(sql, [], (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

// =========================================================
// BUSCAR POR ID
// =========================================================

function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        id,
        nome,
        email,
        telefone
      FROM clientes
      WHERE id = ?
    `;

    db.get(sql, [id], (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row || null);
    });
  });
}

// =========================================================
// CRIAR
// =========================================================

function criar(cliente) {
  return new Promise((resolve, reject) => {
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

    db.run(sql, params, function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        id: this.lastID,
        ...cliente,
      });
    });
  });
}

// =========================================================
// ATUALIZAR
// =========================================================

function atualizar(id, cliente) {
  return new Promise((resolve, reject) => {
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

    db.run(sql, params, function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        alterado: this.changes > 0,
        changes: this.changes,
      });
    });
  });
}

// =========================================================
// EXCLUIR
// =========================================================

function excluir(id) {
  return new Promise((resolve, reject) => {
    const sql = `
      DELETE FROM clientes
      WHERE id = ?
    `;

    db.run(sql, [id], function (error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        excluido: this.changes > 0,
        changes: this.changes,
      });
    });
  });
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

