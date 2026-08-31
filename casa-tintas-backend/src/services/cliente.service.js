
// =========================================================
// CLIENTE SERVICE
// =========================================================

const clienteRepository = require("../repositories/cliente.repository");

// =========================================================
// LISTAR CLIENTES
// =========================================================

async function listarClientes() {
  return clienteRepository.listarTodos();
}

// =========================================================
// BUSCAR CLIENTE POR ID
// =========================================================

async function buscarClientePorId(id) {
  const cliente = await clienteRepository.buscarPorId(id);

  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  }

  return cliente;
}

// =========================================================
// CRIAR CLIENTE
// =========================================================

async function criarCliente(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do cliente são obrigatórios.");
  }

  if (!dados.nome || dados.nome.trim() === "") {
    throw new Error("O nome do cliente é obrigatório.");
  }

  if (!dados.email || dados.email.trim() === "") {
    throw new Error("O email do cliente é obrigatório.");
  }

  const cliente = {
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    telefone: dados.telefone || null,
  };

  return clienteRepository.criar(cliente);
}

// =========================================================
// ATUALIZAR CLIENTE
// =========================================================

async function atualizarCliente(id, dados) {
  const cliente = await clienteRepository.buscarPorId(id);

  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  }

  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do cliente são obrigatórios.");
  }

  if (!dados.nome || dados.nome.trim() === "") {
    throw new Error("O nome do cliente é obrigatório.");
  }

  if (!dados.email || dados.email.trim() === "") {
    throw new Error("O email do cliente é obrigatório.");
  }

  const alterado = await clienteRepository.atualizar(id, {
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    telefone: dados.telefone ?? cliente.telefone,
  });

  if (!alterado) {
    throw new Error("Não foi possível atualizar o cliente.");
  }

  return clienteRepository.buscarPorId(id);
}

// =========================================================
// EXCLUIR CLIENTE
// =========================================================

async function excluirCliente(id) {
  const cliente = await clienteRepository.buscarPorId(id);

  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  }

  const excluido = await clienteRepository.excluir(id);

  if (!excluido) {
    throw new Error("Não foi possível excluir o cliente.");
  }

  return true;
}

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  excluirCliente,
};

