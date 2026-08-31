
// =========================================================
// APP — FASTIFY
// =========================================================

require("dotenv").config();

const Fastify = require("fastify");
const cors = require("@fastify/cors");

const produtoRoutes = require("./routes/produto.routes");
const categoriaRoutes = require("./routes/categoria.routes");
const clienteRoutes = require("./routes/cliente.routes");
const enderecoRoutes = require("./routes/endereco.routes");
const pedidoRoutes = require("./routes/pedido.routes");
const itemPedidoRoutes = require("./routes/item-pedido.routes");
// =========================================================
// CRIAR APLICAÇÃO
// =========================================================

async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // =======================================================
  // CORS
  // =======================================================

  await app.register(cors, {
    origin: true,
  });

  // =======================================================
  // ROTAS 
  // =======================================================

  await app.register(produtoRoutes);
  await app.register(categoriaRoutes);
  await app.register(clienteRoutes);
  await app.register(enderecoRoutes);
  await app.register(pedidoRoutes);
  await app.register(itemPedidoRoutes);
  // =======================================================
  // ROTASDA APLICAÇÃO 
  // =======================================================

  app.get("/", async () => {
    return {
      success: true,
      application: "Casa de Tintas API",
      version: "1.0.0",
      message: "Backend funcionando.",
    };
  });

  // =======================================================
  // HEALTH CHECK
  // =======================================================

  app.get("/health", async () => {
    return {
      success: true,
      message: "Casa de Tintas Backend funcionando.",
    };
  });

  return app;
}

// =========================================================
// EXPORTAR APLICAÇÃO
// =========================================================

module.exports = buildApp;

