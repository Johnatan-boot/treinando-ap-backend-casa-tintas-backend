// =========================================================
// ENDEREÇO SERVICE
// =========================================================

const enderecoRepository = require("../repositories/endereco.repository");
const clienteRepository = require("../repositories/cliente.repository");

// =========================================================
// LISTAR ENDEREÇOS
// =========================================================

async function listarEnderecos() {
  return enderecoRepository.listarTodos();
}

// =========================================================
// BUSCAR ENDEREÇO POR ID
// =========================================================

async function buscarEnderecoPorId(id) {
  const endereco = await enderecoRepository.buscarPorId(id);

  if (!endereco) {
    throw new Error("Endereço não encontrado.");
  }

  return endereco;
}

// =========================================================
// VALIDAR CLIENTE
// =========================================================

async function validarCliente(cliente_id) {
  const cliente = await clienteRepository.buscarPorId(cliente_id);

  if (!cliente) {
    throw new Error("Cliente não encontrado.");
  }
}

// =========================================================
// CRIAR ENDEREÇO
// =========================================================

async function criarEndereco(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do endereço são obrigatórios.");
  }

  if (!dados.cliente_id) {
    throw new Error("O cliente é obrigatório.");
  }

  if (!dados.cep || dados.cep.trim() === "") {
    throw new Error("O CEP é obrigatório.");
  }

  if (!dados.logradouro || dados.logradouro.trim() === "") {
    throw new Error("O logradouro é obrigatório.");
  }

  if (!dados.numero || dados.numero.toString().trim() === "") {
    throw new Error("O número é obrigatório.");
  }

  if (!dados.bairro || dados.bairro.trim() === "") {
    throw new Error("O bairro é obrigatório.");
  }

  if (!dados.cidade || dados.cidade.trim() === "") {
    throw new Error("A cidade é obrigatória.");
  }

  if (!dados.estado || dados.estado.trim() === "") {
    throw new Error("O estado é obrigatório.");
  }

  const cliente_id = Number(dados.cliente_id);

  if (!Number.isInteger(cliente_id) || cliente_id <= 0) {
    throw new Error("ID do cliente inválido.");
  }

  await validarCliente(cliente_id);

  const endereco = {
    cliente_id,
    cep: dados.cep.trim(),
    logradouro: dados.logradouro.trim(),
    numero: dados.numero.toString().trim(),
    complemento: dados.complemento?.trim() || null,
    bairro: dados.bairro.trim(),
    cidade: dados.cidade.trim(),
    estado: dados.estado.trim(),
  };

  const resultado = await enderecoRepository.criar(endereco);

  return enderecoRepository.buscarPorId(resultado.lastID);
}

// =========================================================
// ATUALIZAR ENDEREÇO
// =========================================================

async function atualizarEndereco(id, dados) {
  const endereco = await enderecoRepository.buscarPorId(id);

  if (!endereco) {
    throw new Error("Endereço não encontrado.");
  }

  if (!dados || typeof dados !== "object") {
    throw new Error("Dados do endereço são obrigatórios.");
  }

  if (!dados.cliente_id) {
    throw new Error("O cliente é obrigatório.");
  }

  if (!dados.cep || dados.cep.trim() === "") {
    throw new Error("O CEP é obrigatório.");
  }

  if (!dados.logradouro || dados.logradouro.trim() === "") {
    throw new Error("O logradouro é obrigatório.");
  }

  if (!dados.numero || dados.numero.toString().trim() === "") {
    throw new Error("O número é obrigatório.");
  }

  if (!dados.bairro || dados.bairro.trim() === "") {
    throw new Error("O bairro é obrigatório.");
  }

  if (!dados.cidade || dados.cidade.trim() === "") {
    throw new Error("A cidade é obrigatória.");
  }

  if (!dados.estado || dados.estado.trim() === "") {
    throw new Error("O estado é obrigatório.");
  }

  const cliente_id = Number(dados.cliente_id);

  if (!Number.isInteger(cliente_id) || cliente_id <= 0) {
    throw new Error("ID do cliente inválido.");
  }

  await validarCliente(cliente_id);

  const resultado = await enderecoRepository.atualizar(id, {
    cliente_id,
    cep: dados.cep.trim(),
    logradouro: dados.logradouro.trim(),
    numero: dados.numero.toString().trim(),
    complemento: dados.complemento?.trim() || null,
    bairro: dados.bairro.trim(),
    cidade: dados.cidade.trim(),
    estado: dados.estado.trim(),
  });

  if (!resultado.changes) {
    throw new Error("Não foi possível atualizar o endereço.");
  }

  return enderecoRepository.buscarPorId(id);
}

// =========================================================
// EXCLUIR ENDEREÇO
// =========================================================

async function excluirEndereco(id) {
  const endereco = await enderecoRepository.buscarPorId(id);

  if (!endereco) {
    throw new Error("Endereço não encontrado.");
  }

  const resultado = await enderecoRepository.excluir(id);

  if (!resultado.changes) {
    throw new Error("Não foi possível excluir o endereço.");
  }

  return true;
}

// =========================================================
// EXPORTAÇÃO
// =========================================================

module.exports = {
  listarEnderecos,
  buscarEnderecoPorId,
  criarEndereco,
  atualizarEndereco,
  excluirEndereco,
};