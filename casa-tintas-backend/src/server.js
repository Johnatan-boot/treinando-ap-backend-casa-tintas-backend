
// =========================================================
// SERVER — CASA DE TINTAS API
// =========================================================

require("dotenv").config();

const buildApp = require("./app");

// =========================================================
// CONFIGURAÇÃO
// =========================================================

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "0.0.0.0";

// =========================================================
// INICIAR SERVIDOR
// =========================================================

async function start() {
  try {
    const app = await buildApp();

    await app.listen({
      port: PORT,
      host: HOST,
    });

    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (error) {
    console.error("========================================");
    console.error("ERRO AO INICIAR O SERVIDOR");
    console.error("========================================");
    console.error(error);

    process.exit(1);
  }
}

// =========================================================
// EXECUTAR
// =========================================================

start();

