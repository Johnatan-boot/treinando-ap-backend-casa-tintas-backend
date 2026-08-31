// =========================================================
// CATEGORIA ROUTES
// =========================================================

const categoriaController =
  require("../controllers/categoria.controller");

async function categoriaRoutes(app) {

  // GET /api/categorias
  app.get(
    "/api/categorias",
    categoriaController.listarCategorias
  );

  // GET /api/categorias/:id
  app.get(
    "/api/categorias/:id",
    categoriaController.buscarCategoriaPorId
  );

  // POST /api/categorias
  app.post(
    "/api/categorias",
    categoriaController.criarCategoria
  );

  // PUT /api/categorias/:id
  app.put(
    "/api/categorias/:id",
    categoriaController.atualizarCategoria
  );

  // DELETE /api/categorias/:id
  app.delete(
    "/api/categorias/:id",
    categoriaController.excluirCategoria
  );
}

module.exports = categoriaRoutes;