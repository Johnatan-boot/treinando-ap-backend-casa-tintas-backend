// =========================================================
// PEDIDO SERVICE
// =========================================================

const pedidoRepository = require("../repositories/pedido.repository");
const clienteRepository = require("../repositories/cliente.repository");

// =========================================================
// LISTAR
// =========================================================

async function listarPedidos() {
  return pedidoRepository.listarTodos();
}

// =========================================================
// BUSCAR POR ID
// =========================================================

async function buscarPedidoPorId(id) {
  const pedido = await pedidoRepository.buscarPorId(id);

  if (!pedido) {
    throw new Error("Pedido não encontrado.");
  }

  return pedido;
}

// =========================================================
// CRIAR
// =========================================================

async function criarPedido(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do pedido são obrigatórios.");
  }

  if (!Number.isInteger(Number(dados.cliente_id)) || Number(dados.cliente_id) <= 0) {
    throw new Error("Cliente do pedido é obrigatório.");
  }

  if (!Number.isInteger(Number(dados.endereco_id)) || Number(dados.endereco_id) <= 0) {
    throw new Error("Endereço do pedido é obrigatório.");
  }

  const cliente = await clienteRepository.buscarPorId(
    Number(dados.cliente_id)
  );

  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  }

  const pedido = {
    cliente_id: Number(dados.cliente_id),
    endereco_id: Number(dados.endereco_id),
    status: dados.status || "aguardando_pagamento",
    subtotal: Number(dados.subtotal) || 0,
    frete: Number(dados.frete) || 0,
    total: Number(dados.total) || 0,
  };

  return pedidoRepository.criar(pedido);
}

// =========================================================
// ATUALIZAR
// =========================================================

async function atualizarPedido(id, dados) {
  const pedidoAtual = await pedidoRepository.buscarPorId(id);

  if (!pedidoAtual) {
    throw new Error("Pedido não encontrado.");
  }

  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do pedido são obrigatórios.");
  }

  if (!Number.isInteger(Number(dados.cliente_id)) || Number(dados.cliente_id) <= 0) {
    throw new Error("Cliente do pedido é obrigatório.");
  }

  if (!Number.isInteger(Number(dados.endereco_id)) || Number(dados.endereco_id) <= 0) {
    throw new Error("Endereço do pedido é obrigatório.");
  }

  const cliente = await clienteRepository.buscarPorId(
    Number(dados.cliente_id)
  );

  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  }

  const alterado = await pedidoRepository.atualizar(id, {
    cliente_id: Number(dados.cliente_id),
    endereco_id: Number(dados.endereco_id),
    status: dados.status ?? pedidoAtual.status,
    subtotal: Number(dados.subtotal ?? pedidoAtual.subtotal),
    frete: Number(dados.frete ?? pedidoAtual.frete),
    total: Number(dados.total ?? pedidoAtual.total),
  });

  if (!alterado) {
    throw new Error("Não foi possível atualizar o pedido.");
  }

  return pedidoRepository.buscarPorId(id);
}

// =========================================================
// EXCLUIR
// =========================================================

async function excluirPedido(id) {
  const pedido = await pedidoRepository.buscarPorId(id);

  if (!pedido) {
    throw new Error("Pedido não encontrado.");
  }

  const excluido = await pedidoRepository.excluir(id);

  if (!excluido) {
    throw new Error("Não foi possível excluir o pedido.");
  }

  return true;
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