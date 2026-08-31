// =========================================================
// ENDEREÇO CONTROLLER
// =========================================================

const enderecoService = require("../services/endereco.service");

// =========================================================
// LISTAR
// GET /api/enderecos
// =========================================================

async function listarEnderecos(request, reply) {
  try {
    const enderecos = await enderecoService.listarEnderecos();

    return reply.code(200).send({
      success: true,
      data: enderecos,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao listar endereços.",
    });
  }
}

// =========================================================
// BUSCAR
// GET /api/enderecos/:id
// =========================================================

async function buscarEnderecoPorId(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do endereço inválido.",
      });
    }

    const endereco =
      await enderecoService.buscarEnderecoPorId(id);

    return reply.code(200).send({
      success: true,
      data: endereco,
    });
  } catch (error) {
    if (error.message === "Endereço não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao buscar endereço.",
    });
  }
}

// =========================================================
// CRIAR
// POST /api/enderecos
// =========================================================

async function criarEndereco(request, reply) {
  try {
    const endereco =
      await enderecoService.criarEndereco(request.body);

    return reply.code(201).send({
      success: true,
      message: "Endereço criado com sucesso.",
      data: endereco,
    });
  } catch (error) {
    const errosValidacao = [
      "Dados do endereço são obrigatórios.",
      "O cliente é obrigatório.",
      "O CEP é obrigatório.",
      "O logradouro é obrigatório.",
      "O número é obrigatório.",
      "O bairro é obrigatório.",
      "A cidade é obrigatória.",
      "O estado é obrigatório.",
      "ID do cliente inválido.",
      "Cliente não encontrado.",
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
      message: "Erro ao criar endereço.",
    });
  }
}

// =========================================================
// ATUALIZAR
// PUT /api/enderecos/:id
// =========================================================

async function atualizarEndereco(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do endereço inválido.",
      });
    }

    const endereco =
      await enderecoService.atualizarEndereco(
        id,
        request.body
      );

    return reply.code(200).send({
      success: true,
      message: "Endereço atualizado com sucesso.",
      data: endereco,
    });
  } catch (error) {
    if (error.message === "Endereço não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    const errosValidacao = [
      "Dados do endereço são obrigatórios.",
      "O cliente é obrigatório.",
      "O CEP é obrigatório.",
      "O logradouro é obrigatório.",
      "O número é obrigatório.",
      "O bairro é obrigatório.",
      "A cidade é obrigatória.",
      "O estado é obrigatório.",
      "ID do cliente inválido.",
      "Cliente não encontrado.",
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
      message:
        error.message ||
        "Erro ao atualizar endereço.",
    });
  }
}

// =========================================================
// EXCLUIR
// DELETE /api/enderecos/:id
// =========================================================

async function excluirEndereco(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do endereço inválido.",
      });
    }

    await enderecoService.excluirEndereco(id);

    return reply.code(200).send({
      success: true,
      message: "Endereço excluído com sucesso.",
    });
  } catch (error) {
    if (error.message === "Endereço não encontrado.") {
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
        "Erro ao excluir endereço.",
    });
  }
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