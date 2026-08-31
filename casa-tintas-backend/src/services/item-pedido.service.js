
// =========================================================
// ITEM PEDIDO SERVICE
// =========================================================

const itemPedidoRepository = require("../repositories/item-pedido.repository");

// =========================================================
// LISTAR ITENS
// =========================================================

async function listarItensPedido() {
  return itemPedidoRepository.listarTodos();
}

// =========================================================
// BUSCAR ITEM POR ID
// =========================================================

async function buscarItemPedidoPorId(id) {
  const item = await itemPedidoRepository.buscarPorId(id);

  if (!item) {
    throw new Error("Item do pedido não encontrado.");
  }

  return item;
}

// =========================================================
// CRIAR ITEM
// =========================================================

async function criarItemPedido(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do item do pedido são obrigatórios.");
  }

  if (!Number.isInteger(Number(dados.pedido_id)) || Number(dados.pedido_id) <= 0) {
    throw new Error("Pedido inválido.");
  }

  if (!Number.isInteger(Number(dados.produto_id)) || Number(dados.produto_id) <= 0) {
    throw new Error("Produto inválido.");
  }

  if (!Number.isInteger(Number(dados.quantidade)) || Number(dados.quantidade) <= 0) {
    throw new Error("A quantidade deve ser maior que zero.");
  }

  if (dados.preco_unitario === undefined || Number(dados.preco_unitario) < 0) {
    throw new Error("O preço unitário é obrigatório.");
  }

  if (dados.subtotal === undefined || Number(dados.subtotal) < 0) {
    throw new Error("O subtotal é obrigatório.");
  }

  const item = {
    pedido_id: Number(dados.pedido_id),
    produto_id: Number(dados.produto_id),
    quantidade: Number(dados.quantidade),
    preco_unitario: Number(dados.preco_unitario),
    subtotal: Number(dados.subtotal),
  };

  return itemPedidoRepository.criar(item);
}

// =========================================================
// ATUALIZAR ITEM
// =========================================================

async function atualizarItemPedido(id, dados) {
  const itemExistente = await itemPedidoRepository.buscarPorId(id);

  if (!itemExistente) {
    throw new Error("Item do pedido não encontrado.");
  }

  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do item do pedido são obrigatórios.");
  }

  if (!Number.isInteger(Number(dados.pedido_id)) || Number(dados.pedido_id) <= 0) {
    throw new Error("Pedido inválido.");
  }

  if (!Number.isInteger(Number(dados.produto_id)) || Number(dados.produto_id) <= 0) {
    throw new Error("Produto inválido.");
  }

  if (!Number.isInteger(Number(dados.quantidade)) || Number(dados.quantidade) <= 0) {
    throw new Error("A quantidade deve ser maior que zero.");
  }

  if (dados.preco_unitario === undefined || Number(dados.preco_unitario) < 0) {
    throw new Error("O preço unitário é obrigatório.");
  }

  if (dados.subtotal === undefined || Number(dados.subtotal) < 0) {
    throw new Error("O subtotal é obrigatório.");
  }

  await itemPedidoRepository.atualizar(id, {
    pedido_id: Number(dados.pedido_id),
    produto_id: Number(dados.produto_id),
    quantidade: Number(dados.quantidade),
    preco_unitario: Number(dados.preco_unitario),
    subtotal: Number(dados.subtotal),
  });

  return itemPedidoRepository.buscarPorId(id);
}

// =========================================================
// EXCLUIR ITEM
// =========================================================

async function excluirItemPedido(id) {
  const item = await itemPedidoRepository.buscarPorId(id);

  if (!item) {
    throw new Error("Item do pedido não encontrado.");
  }

  const resultado = await itemPedidoRepository.excluir(id);

  if (!resultado.changes) {
    throw new Error("Não foi possível excluir o item do pedido.");
  }

  return true;
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

