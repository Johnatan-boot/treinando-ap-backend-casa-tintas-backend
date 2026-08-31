// =========================================================
// PEDIDO CONTROLLER
// =========================================================

const pedidoService = require("../services/pedido.service");

// =========================================================
// LISTAR
// GET /api/pedidos
// =========================================================

async function listarPedidos(request, reply) {
  try {
    const pedidos = await pedidoService.listarPedidos();

    return reply.code(200).send({
      success: true,
      data: pedidos,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao listar pedidos.",
    });
  }
}

// =========================================================
// BUSCAR
// GET /api/pedidos/:id
// =========================================================

async function buscarPedidoPorId(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do pedido inválido.",
      });
    }

    const pedido = await pedidoService.buscarPedidoPorId(id);

    return reply.code(200).send({
      success: true,
      data: pedido,
    });
  } catch (error) {
    if (error.message === "Pedido não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao buscar pedido.",
    });
  }
}

// =========================================================
// CRIAR
// POST /api/pedidos
// =========================================================

async function criarPedido(request, reply) {
  try {
    const pedido = await pedidoService.criarPedido(request.body);

    return reply.code(201).send({
      success: true,
      message: "Pedido criado com sucesso.",
      data: pedido,
    });
  } catch (error) {
    if (
      error.message === "Dados do pedido são obrigatórios." ||
      error.message === "Cliente do pedido é obrigatório." ||
      error.message === "Endereço do pedido é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Cliente não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao criar pedido.",
    });
  }
}

// =========================================================
// ATUALIZAR
// PUT /api/pedidos/:id
// =========================================================

async function atualizarPedido(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do pedido inválido.",
      });
    }

    const pedido = await pedidoService.atualizarPedido(
      id,
      request.body
    );

    return reply.code(200).send({
      success: true,
      message: "Pedido atualizado com sucesso.",
      data: pedido,
    });
  } catch (error) {
    if (
      error.message === "Pedido não encontrado." ||
      error.message === "Cliente não encontrado."
    ) {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Dados do pedido são obrigatórios." ||
      error.message === "Cliente do pedido é obrigatório." ||
      error.message === "Endereço do pedido é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: error.message || "Erro ao atualizar pedido.",
    });
  }
}

// =========================================================
// EXCLUIR
// DELETE /api/pedidos/:id
// =========================================================

async function excluirPedido(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do pedido inválido.",
      });
    }

    await pedidoService.excluirPedido(id);

    return reply.code(200).send({
      success: true,
      message: "Pedido excluído com sucesso.",
    });
  } catch (error) {
    if (error.message === "Pedido não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: error.message || "Erro ao excluir pedido.",
    });
  }
}

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  listarPedidos,
  buscarPedidoPorId,
  criarPedido,
  atualizarPedido,
  excluirPedido,
};