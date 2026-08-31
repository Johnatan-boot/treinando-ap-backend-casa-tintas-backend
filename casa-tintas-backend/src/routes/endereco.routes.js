
// =========================================================
// ENDEREÇO ROUTES
// =========================================================

const enderecoController =
  require("../controllers/endereco.controller");

async function enderecoRoutes(app) {

  // =======================================================
  // LISTAR
  // =======================================================

  // GET /api/enderecos

  app.get(
    "/api/enderecos",
    enderecoController.listarEnderecos
  );

  // =======================================================
  // BUSCAR POR ID
  // =======================================================

  // GET /api/enderecos/:id

  app.get(
    "/api/enderecos/:id",
    enderecoController.buscarEnderecoPorId
  );

  // =======================================================
  // CRIAR
  // =======================================================

  // POST /api/enderecos

  app.post(
    "/api/enderecos",
    enderecoController.criarEndereco
  );

  // =======================================================
  // ATUALIZAR
  // =======================================================

  // PUT /api/enderecos/:id

  app.put(
    "/api/enderecos/:id",
    enderecoController.atualizarEndereco
  );

  // =======================================================
  // EXCLUIR
  // =======================================================

  // DELETE /api/enderecos/:id

  app.delete(
    "/api/enderecos/:id",
    enderecoController.excluirEndereco
  );
}

module.exports = enderecoRoutes;

