// =========================================================
// CATEGORIA SERVICE
// =========================================================

const categoriaRepository = require("../repositories/categoria.repository");

// =========================================================
// LISTAR
// =========================================================

async function listarCategorias() {
  return categoriaRepository.listarTodas();
}

// =========================================================
// BUSCAR POR ID
// =========================================================

async function buscarCategoriaPorId(id) {
  const categoria = await categoriaRepository.buscarPorId(id);

  if (!categoria) {
    throw new Error("Categoria não encontrada.");
  }

  return categoria;
}

// =========================================================
// CRIAR
// =========================================================

async function criarCategoria(dados) {
  if (!dados || typeof dados !== "object") {
    throw new Error("Dados da categoria são obrigatórios.");
  }

  if (!dados.nome || dados.nome.trim() === "") {
    throw new Error("O nome da categoria é obrigatório.");
  }

  const categoria = {
    nome: dados.nome.trim(),
    descricao: dados.descricao || "",
  };

  return categoriaRepository.criar(categoria);
}

// =========================================================
// ATUALIZAR
// =========================================================

async function atualizarCategoria(id, dados) {
  const categoria = await categoriaRepository.buscarPorId(id);

  if (!categoria) {
    throw new Error("Categoria não encontrada.");
  }

  if (!dados || typeof dados !== "object") {
    throw new Error("Dados da categoria são obrigatórios.");
  }

  if (!dados.nome || dados.nome.trim() === "") {
    throw new Error("O nome da categoria é obrigatório.");
  }

  const dadosAtualizados = {
    nome: dados.nome.trim(),
    descricao: dados.descricao ?? categoria.descricao,
  };

  await categoriaRepository.atualizar(id, dadosAtualizados);

  // Busca novamente para confirmar o estado final
  const categoriaAtualizada =
    await categoriaRepository.buscarPorId(id);

  if (!categoriaAtualizada) {
    throw new Error("Não foi possível atualizar a categoria.");
  }

  return categoriaAtualizada;
}

// =========================================================
// EXCLUIR
// =========================================================

async function excluirCategoria(id) {
  const categoria = await categoriaRepository.buscarPorId(id);

  if (!categoria) {
    throw new Error("Categoria não encontrada.");
  }

  await categoriaRepository.excluir(id);

  // Confirma que realmente foi removida
  const categoriaExcluida =
    await categoriaRepository.buscarPorId(id);

  if (categoriaExcluida) {
    throw new Error("Não foi possível excluir a categoria.");
  }

  return true;
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