// =========================================================
// DATABASE — MYSQL
// =========================================================

const mysql = require("mysql2/promise");

// =========================================================
// CONFIGURAÇÃO
// =========================================================

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// =========================================================
// TESTAR CONEXÃO
// =========================================================

async function testarConexao() {
  let connection;

  try {
    connection = await pool.getConnection();

    console.log("Conexão com MySQL realizada com sucesso.");

    return true;
  } catch (error) {
    console.error("Erro ao conectar com MySQL:");
    console.error(error);

    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  pool,
  testarConexao,
};
