
// =========================================================
// CLIENTE CONTROLLER
// =========================================================

const clienteService = require("../services/cliente.service");

// =========================================================
// LISTAR
// GET /api/clientes
// =========================================================

async function listarClientes(request, reply) {
  try {
    const clientes = await clienteService.listarClientes();

    return reply.code(200).send({
      success: true,
      data: clientes,
    });
  } catch (error) {
    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao listar clientes.",
    });
  }
}

// =========================================================
// BUSCAR
// GET /api/clientes/:id
// =========================================================

async function buscarClientePorId(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do cliente inválido.",
      });
    }

    const cliente =
      await clienteService.buscarClientePorId(id);

    return reply.code(200).send({
      success: true,
      data: cliente,
    });
  } catch (error) {
    if (error.message === "Cliente não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao buscar cliente.",
    });
  }
}

// =========================================================
// CRIAR
// POST /api/clientes
// =========================================================

async function criarCliente(request, reply) {
  try {
    const cliente =
      await clienteService.criarCliente(request.body);

    return reply.code(201).send({
      success: true,
      message: "Cliente criado com sucesso.",
      data: cliente,
    });
  } catch (error) {
    // Validações
    if (
      error.message ===
        "Dados do cliente são obrigatórios." ||
      error.message ===
        "O nome do cliente é obrigatório." ||
      error.message ===
        "O email do cliente é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    // Email duplicado
    if (error.code === "SQLITE_CONSTRAINT") {
      return reply.code(409).send({
        success: false,
        message: "Este email já está cadastrado.",
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message: "Erro ao criar cliente.",
    });
  }
}

// =========================================================
// ATUALIZAR
// PUT /api/clientes/:id
// =========================================================

async function atualizarCliente(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do cliente inválido.",
      });
    }

    const cliente =
      await clienteService.atualizarCliente(
        id,
        request.body
      );

    return reply.code(200).send({
      success: true,
      message: "Cliente atualizado com sucesso.",
      data: cliente,
    });
  } catch (error) {
    if (error.message === "Cliente não encontrado.") {
      return reply.code(404).send({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
        "Dados do cliente são obrigatórios." ||
      error.message ===
        "O nome do cliente é obrigatório." ||
      error.message ===
        "O email do cliente é obrigatório."
    ) {
      return reply.code(400).send({
        success: false,
        message: error.message,
      });
    }

    // Email duplicado
    if (error.code === "SQLITE_CONSTRAINT") {
      return reply.code(409).send({
        success: false,
        message: "Este email já está cadastrado.",
      });
    }

    request.log.error(error);

    return reply.code(500).send({
      success: false,
      message:
        error.message ||
        "Erro ao atualizar cliente.",
    });
  }
}

// =========================================================
// EXCLUIR
// DELETE /api/clientes/:id
// =========================================================

async function excluirCliente(request, reply) {
  try {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.code(400).send({
        success: false,
        message: "ID do cliente inválido.",
      });
    }

    await clienteService.excluirCliente(id);

    return reply.code(200).send({
      success: true,
      message: "Cliente excluído com sucesso.",
    });
  } catch (error) {
    if (error.message === "Cliente não encontrado.") {
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
        "Erro ao excluir cliente.",
    });
  }
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

