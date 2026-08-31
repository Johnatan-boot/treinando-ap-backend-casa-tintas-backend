
// =========================================================
// ITEM PEDIDO CONTROLLER
// =========================================================

const itemPedidoService = require("../services/item-pedido.service");

// =========================================================
// LISTAR
// GET /api/itens-pedido
// =========================================================

async function listarItensPedido(request, reply) {
  try {
    const itens = await itemPedidoService.listarItensPedido();

    return reply.code(200).send({
      success: true,
      data: itens,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao listar itens do pedido.",
    });
  }
}

// =========================================================
// BUSCAR
// GET /api/itens-pedido/:id
// =========================================================

async function buscarItemPedidoPorId(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do item do pedido inválido.",
      });
    }

    const item = await itemPedidoService.buscarItemPedidoPorId(id);

    return reply.code(200).send({
      success: true,
      data: item,
    });
  } catch (error) {
    if (error.message === "Item do pedido não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao buscar item do pedido.",
    });
  }
}

// =========================================================
// CRIAR
// POST /api/itens-pedido
// =========================================================

async function criarItemPedido(request, reply) {
  try {
    const item = await itemPedidoService.criarItemPedido(request.body);

    return reply.code(201).send({
      success: true,
      message: "Item do pedido criado com sucesso.",
      data: item,
    });
  } catch (error) {
    if (
      error.message === "Dados do item do pedido são obrigatórios." ||
      error.message === "Pedido inválido." ||
      error.message === "Produto inválido." ||
      error.message === "A quantidade deve ser maior que zero." ||
      error.message === "O preço unitário é obrigatório." ||
      error.message === "O subtotal é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao criar item do pedido.",
    });
  }
}

// =========================================================
// ATUALIZAR
// PUT /api/itens-pedido/:id
// =========================================================

async function atualizarItemPedido(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do item do pedido inválido.",
      });
    }

    const item = await itemPedidoService.atualizarItemPedido(
      id,
      request.body
    );

    return reply.code(200).send({
      success: true,
      message: "Item do pedido atualizado com sucesso.",
      data: item,
    });
  } catch (error) {
    if (error.message === "Item do pedido não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Dados do item do pedido são obrigatórios." ||
      error.message === "Pedido inválido." ||
      error.message === "Produto inválido." ||
      error.message === "A quantidade deve ser maior que zero." ||
      error.message === "O preço unitário é obrigatório." ||
      error.message === "O subtotal é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao atualizar item do pedido.",
    });
  }
}

// =========================================================
// EXCLUIR
// DELETE /api/itens-pedido/:id
// =========================================================

async function excluirItemPedido(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do item do pedido inválido.",
      });
    }

    await itemPedidoService.excluirItemPedido(id);

    return reply.code(200).send({
      success: true,
      message: "Item do pedido excluído com sucesso.",
    });
  } catch (error) {
    if (error.message === "Item do pedido não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao excluir item do pedido.",
    });
  }
}

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  listarItensPedido,
  buscarItemPedidoPorId,
  criarItemPedido,
  atualizarItemPedido,
  excluirItemPedido,
};

