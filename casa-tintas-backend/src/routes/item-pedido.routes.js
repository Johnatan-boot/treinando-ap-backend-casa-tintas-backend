
// =========================================================
// ITEM PEDIDO ROUTES
// =========================================================

const itemPedidoController = require("../controllers/item-pedido.controller");

// =========================================================
// ROTAS
// =========================================================

async function itemPedidoRoutes(app) {

  // GET /api/itens-pedido

  app.get(
    "/api/itens-pedido",
    itemPedidoController.listarItensPedido
  );

  // GET /api/itens-pedido/:id

  app.get(
    "/api/itens-pedido/:id",
    itemPedidoController.buscarItemPedidoPorId
  );

  // POST /api/itens-pedido

  app.post(
    "/api/itens-pedido",
    itemPedidoController.criarItemPedido
  );

  // PUT /api/itens-pedido/:id

  app.put(
    "/api/itens-pedido/:id",
    itemPedidoController.atualizarItemPedido
  );

  // DELETE /api/itens-pedido/:id

  app.delete(
    "/api/itens-pedido/:id",
    itemPedidoController.excluirItemPedido
  );
}

module.exports = itemPedidoRoutes;

