
// =========================================================
// PRODUTO ROUTES
// =========================================================

const produtoController = require("../controllers/produto.controller");

async function produtoRoutes(app) {
  // =======================================================
  // LISTAR
  // =======================================================

  app.get(
    "/api/produtos",
    produtoController.listarProdutos
  );

  // =======================================================
  // BUSCAR POR ID
  // =======================================================

  app.get(
    "/api/produtos/:id",
    produtoController.buscarProdutoPorId
  );

  // =======================================================
  // CRIAR
  // =======================================================

  app.post(
    "/api/produtos",
    produtoController.criarProduto
  );

  // =======================================================
  // ATUALIZAR
  // =======================================================

  app.put(
    "/api/produtos/:id",
    produtoController.atualizarProduto
  );

  // =======================================================
  // EXCLUIR
  // =======================================================

  app.delete(
    "/api/produtos/:id",
    produtoController.excluirProduto
  );
}

module.exports = produtoRoutes;

