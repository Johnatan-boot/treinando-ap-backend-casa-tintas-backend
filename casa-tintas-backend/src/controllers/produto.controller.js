
// =========================================================
// PRODUTO CONTROLLER
// =========================================================

const produtoService = require("../services/produto.service");

// =========================================================
// LISTAR PRODUTOS
// GET /api/produtos
// =========================================================

async function listarProdutos(request, reply) {
  try {
    const produtos = await produtoService.listarProdutos();

    return reply.code(200).send({
      success: true,
      data: produtos,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao listar produtos.",
    });
  }
}

// =========================================================
// BUSCAR PRODUTO POR ID
// GET /api/produtos/:id
// =========================================================

async function buscarProdutoPorId(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do produto inválido.",
      });
    }

    const produto = await produtoService.buscarProdutoPorId(id);

    return reply.code(200).send({
      success: true,
      data: produto,
    });
  } catch (error) {
    if (error.message === "Produto não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao buscar produto.",
    });
  }
}

// =========================================================
// CRIAR PRODUTO
// POST /api/produtos
// =========================================================

async function criarProduto(request, reply) {
  try {
    const produto = await produtoService.criarProduto(request.body);

    return reply.code(201).send({
      success: true,
      message: "Produto criado com sucesso.",
      data: produto,
    });
  } catch (error) {
    const errosValidacao = [
      "O nome do produto é obrigatório.",
      "A quantidade do produto é inválida.",
      "O preço do produto é inválido.",
      "A categoria do produto é obrigatória.",
    ];

    if (errosValidacao.includes(error.message)) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao criar produto.",
    });
  }
}

// =========================================================
// ATUALIZAR PRODUTO
// PUT /api/produtos/:id
// =========================================================

async function atualizarProduto(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do produto inválido.",
      });
    }

    const produto = await produtoService.atualizarProduto(
      id,
      request.body
    );

    return reply.code(200).send({
      success: true,
      message: "Produto atualizado com sucesso.",
      data: produto,
    });
  } catch (error) {
    if (error.message === "Produto não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "O nome do produto é obrigatório." ||
      error.message === "A quantidade do produto é inválida." ||
      error.message === "O preço do produto é inválido." ||
      error.message === "A categoria do produto é inválida."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: error.message || "Erro ao atualizar produto.",
    });
  }
}

// =========================================================
// EXCLUIR PRODUTO
// DELETE /api/produtos/:id
// =========================================================

async function excluirProduto(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do produto inválido.",
      });
    }

    await produtoService.excluirProduto(id);

    return reply.code(200).send({
      success: true,
      message: "Produto excluído com sucesso.",
    });
  } catch (error) {
    if (error.message === "Produto não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: error.message || "Erro ao excluir produto.",
    });
  }
}

// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto,
};

