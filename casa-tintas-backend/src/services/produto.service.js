
// =========================================================
// PRODUTO SERVICE
// =========================================================

const produtoRepository = require("../repositories/produto.repository");

// =========================================================
// LISTAR PRODUTOS
// =========================================================

async function listarProdutos() {
  return produtoRepository.listarTodos();
}

// =========================================================
// BUSCAR PRODUTO
// =========================================================

async function buscarProdutoPorId(id) {
  const produto = await produtoRepository.buscarPorId(id);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  return produto;
}

// =========================================================
// CRIAR PRODUTO
// =========================================================

async function criarProduto(dados) {
  if (!dados.nome || dados.nome.trim() === "") {
    throw new Error("O nome do produto é obrigatório.");
  }

  if (
    dados.quantidade === undefined ||
    dados.quantidade === null ||
    Number.isNaN(Number(dados.quantidade)) ||
    Number(dados.quantidade) < 0
  ) {
    throw new Error("A quantidade do produto é inválida.");
  }

  if (
    dados.preco === undefined ||
    dados.preco === null ||
    Number.isNaN(Number(dados.preco)) ||
    Number(dados.preco) < 0
  ) {
    throw new Error("O preço do produto é inválido.");
  }

  if (!dados.categoria_id) {
    throw new Error("A categoria do produto é obrigatória.");
  }

  const produto = {
    nome: dados.nome.trim(),
    descricao: dados.descricao || "",
    quantidade: Number(dados.quantidade),
    preco: Number(dados.preco),
    imagem: dados.imagem || null,
    categoria_id: Number(dados.categoria_id),
  };

  return produtoRepository.criar(produto);
}

// =========================================================
// ATUALIZAR PRODUTO
// =========================================================

async function atualizarProduto(id, dados) {
  // -------------------------------------------------------
  // Verificar se o produto existe
  // -------------------------------------------------------

  const produto = await produtoRepository.buscarPorId(id);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  // -------------------------------------------------------
  // Validação do nome
  // -------------------------------------------------------

  if (!dados.nome || dados.nome.trim() === "") {
    throw new Error("O nome do produto é obrigatório.");
  }

  // -------------------------------------------------------
  // Validação da quantidade
  // -------------------------------------------------------

  if (
    dados.quantidade === undefined ||
    dados.quantidade === null ||
    Number.isNaN(Number(dados.quantidade)) ||
    Number(dados.quantidade) < 0
  ) {
    throw new Error("A quantidade do produto é inválida.");
  }

  // -------------------------------------------------------
  // Validação do preço
  // -------------------------------------------------------

  if (
    dados.preco === undefined ||
    dados.preco === null ||
    Number.isNaN(Number(dados.preco)) ||
    Number(dados.preco) < 0
  ) {
    throw new Error("O preço do produto é inválido.");
  }

  // -------------------------------------------------------
  // Categoria
  // -------------------------------------------------------

  const categoriaId =
    dados.categoria_id !== undefined &&
    dados.categoria_id !== null
      ? Number(dados.categoria_id)
      : produto.categoria_id;

  if (
    !Number.isInteger(categoriaId) ||
    categoriaId <= 0
  ) {
    throw new Error("A categoria do produto é inválida.");
  }

  // -------------------------------------------------------
  // Montar dados atualizados
  // -------------------------------------------------------

  const dadosAtualizados = {
    nome: dados.nome.trim(),

    descricao:
      dados.descricao !== undefined
        ? dados.descricao
        : produto.descricao,

    quantidade: Number(dados.quantidade),

    preco: Number(dados.preco),

    imagem:
      dados.imagem !== undefined
        ? dados.imagem
        : produto.imagem,

    categoria_id: categoriaId,
  };

  // -------------------------------------------------------
  // Atualizar no banco
  // -------------------------------------------------------

  const resultado = await produtoRepository.atualizar(
    id,
    dadosAtualizados
  );

  // -------------------------------------------------------
  // Verificar resultado
  // -------------------------------------------------------

  if (!resultado || resultado.changes === 0) {
    throw new Error("Não foi possível atualizar o produto.");
  }

  // -------------------------------------------------------
  // Retornar produto atualizado
  // -------------------------------------------------------

  return produtoRepository.buscarPorId(id);
}

// =========================================================
// EXCLUIR PRODUTO
// =========================================================

async function excluirProduto(id) {
  const produto = await produtoRepository.buscarPorId(id);

  if (!produto) {
    throw new Error("Produto não encontrado.");
  }

  const resultado = await produtoRepository.excluir(id);

  if (!resultado || resultado.changes === 0) {
    throw new Error("Não foi possível excluir o produto.");
  }

  return true;
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

