// =========================================================
// CATEGORIA CONTROLLER
// =========================================================

const categoriaService =
  require("../services/categoria.service");

// =========================================================
// LISTAR
// GET /api/categorias
// =========================================================

async function listarCategorias(request, reply) {
  try {
    const categorias =
      await categoriaService.listarCategorias();

    return reply.code(200).send({
      success: true,
      data: categorias,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao listar categorias.",
    });
  }
}

// =========================================================
// BUSCAR
// GET /api/categorias/:id
// =========================================================

async function buscarCategoriaPorId(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID da categoria inválido.",
      });
    }

    const categoria =
      await categoriaService.buscarCategoriaPorId(id);

    return reply.code(200).send({
      success: true,
      data: categoria,
    });
  } catch (error) {
    if (error.message === "Categoria não encontrada.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao buscar categoria.",
    });
  }
}

// =========================================================
// CRIAR
// POST /api/categorias
// =========================================================

async function criarCategoria(request, reply) {
  try {
    const categoria =
      await categoriaService.criarCategoria(request.body);

    return reply.code(201).send({
      success: true,
      message: "Categoria criada com sucesso.",
      data: categoria,
    });
  } catch (error) {
    if (
      error.message === "Dados da categoria são obrigatórios." ||
      error.message === "O nome da categoria é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao criar categoria.",
    });
  }
}

// =========================================================
// ATUALIZAR
// PUT /api/categorias/:id
// =========================================================

async function atualizarCategoria(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID da categoria inválido.",
      });
    }

    const categoria =
      await categoriaService.atualizarCategoria(
        id,
        request.body
      );

    return reply.code(200).send({
      success: true,
      message: "Categoria atualizada com sucesso.",
      data: categoria,
    });
  } catch (error) {
    if (error.message === "Categoria não encontrada.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Dados da categoria são obrigatórios." ||
      error.message === "O nome da categoria é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message:
        error.message ||
        "Erro ao atualizar categoria.",
    });
  }
}

// =========================================================
// EXCLUIR
// DELETE /api/categorias/:id
// =========================================================

async function excluirCategoria(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID da categoria inválido.",
      });
    }

    await categoriaService.excluirCategoria(id);

    return reply.code(200).send({
      success: true,
      message: "Categoria excluída com sucesso.",
    });
  } catch (error) {
    if (error.message === "Categoria não encontrada.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message:
        error.message ||
        "Erro ao excluir categoria.",
    });
  }
}

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  listarCategorias,
  buscarCategoriaPorId,
  criarCategoria,
  atualizarCategoria,
  excluirCategoria,
};