// =========================================================
// PEDIDO ROUTES
// =========================================================

const pedidoController = require("../controllers/pedido.controller");

async function pedidoRoutes(app) {

  // GET /api/pedidos
  app.get(
    "/api/pedidos",
    pedidoController.listarPedidos
  );

  // GET /api/pedidos/:id
  app.get(
    "/api/pedidos/:id",
    pedidoController.buscarPedidoPorId
  );

  // POST /api/pedidos
  app.post(
    "/api/pedidos",
    pedidoController.criarPedido
  );

  // PUT /api/pedidos/:id
  app.put(
    "/api/pedidos/:id",
    pedidoController.atualizarPedido
  );

  // DELETE /api/pedidos/:id
  app.delete(
    "/api/pedidos/:id",
    pedidoController.excluirPedido
  );
}

module.exports = pedidoRoutes;