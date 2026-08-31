
// =========================================================
// CLIENTE ROUTES
// =========================================================

const clienteController = require("../controllers/cliente.controller");

async function clienteRoutes(app) {
  // GET /api/clientes
  app.get(
    "/api/clientes",
    clienteController.listarClientes
  );

  // GET /api/clientes/:id
  app.get(
    "/api/clientes/:id",
    clienteController.buscarClientePorId
  );

  // POST /api/clientes
  app.post(
    "/api/clientes",
    clienteController.criarCliente
  );

  // PUT /api/clientes/:id
  app.put(
    "/api/clientes/:id",
    clienteController.atualizarCliente
  );

  // DELETE /api/clientes/:id
  app.delete(
    "/api/clientes/:id",
    clienteController.excluirCliente
  );
}

module.exports = clienteRoutes;

