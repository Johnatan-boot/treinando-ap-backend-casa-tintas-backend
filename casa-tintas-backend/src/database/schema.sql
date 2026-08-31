-- =========================================================
-- CASA DE TINTAS — DATABASE SCHEMA
-- MySQL 8+
-- =========================================================

CREATE DATABASE IF NOT EXISTS casa_tintas
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE casa_tintas;


-- =========================================================
-- 1. COMÉRCIOS
-- =========================================================

CREATE TABLE IF NOT EXISTS comercios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    expediente VARCHAR(255) NULL,
    ceo VARCHAR(150) NULL,

    cnpj VARCHAR(18) NOT NULL UNIQUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- =========================================================
-- 2. CATEGORIAS
-- =========================================================

CREATE TABLE IF NOT EXISTS categorias (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    comercio_id INT UNSIGNED NOT NULL,

    nome VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL,

    descricao TEXT NULL,

    ativo BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_categorias_comercio
        FOREIGN KEY (comercio_id)
        REFERENCES comercios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_categoria_comercio_nome
        UNIQUE (comercio_id, nome),

    CONSTRAINT uq_categoria_comercio_slug
        UNIQUE (comercio_id, slug)
);


-- =========================================================
-- 3. LINHAS DE PRODUTO
-- =========================================================

CREATE TABLE IF NOT EXISTS linhas_produto (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    comercio_id INT UNSIGNED NOT NULL,

    nome VARCHAR(100) NOT NULL,
    descricao TEXT NULL,

    ativo BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_linhas_produto_comercio
        FOREIGN KEY (comercio_id)
        REFERENCES comercios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_linha_comercio_nome
        UNIQUE (comercio_id, nome)
);


-- =========================================================
-- 4. FUNCIONÁRIOS
-- =========================================================

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    comercio_id INT UNSIGNED NOT NULL,

    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,

    profissao VARCHAR(100) NOT NULL,

    carga_horaria VARCHAR(50) NOT NULL,

    salario DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    status ENUM(
        'ATIVO',
        'INATIVO',
        'AFASTADO'
    ) NOT NULL DEFAULT 'ATIVO',

    data_admissao DATE NULL,
    data_demissao DATE NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_funcionarios_comercio
        FOREIGN KEY (comercio_id)
        REFERENCES comercios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_funcionarios_nome (nome),
    INDEX idx_funcionarios_status (status)
);


-- =========================================================
-- 5. FUNCIONÁRIO × CATEGORIA
-- Relação N:N
-- =========================================================

CREATE TABLE IF NOT EXISTS funcionario_categorias (
    funcionario_id INT UNSIGNED NOT NULL,
    categoria_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (
        funcionario_id,
        categoria_id
    ),

    CONSTRAINT fk_funcionario_categoria_funcionario
        FOREIGN KEY (funcionario_id)
        REFERENCES funcionarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_funcionario_categoria_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- =========================================================
-- 6. PRODUTOS
-- =========================================================

CREATE TABLE IF NOT EXISTS produtos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    comercio_id INT UNSIGNED NOT NULL,

    categoria_id INT UNSIGNED NOT NULL,

    linha_id INT UNSIGNED NULL,

    nome VARCHAR(200) NOT NULL,

    slug VARCHAR(220) NOT NULL,

    descricao TEXT NULL,

    codigo VARCHAR(100) NULL,

    preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    imagem_url VARCHAR(500) NULL,

    ativo BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_produtos_comercio
        FOREIGN KEY (comercio_id)
        REFERENCES comercios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_produtos_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_produtos_linha
        FOREIGN KEY (linha_id)
        REFERENCES linhas_produto(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT uq_produto_comercio_slug
        UNIQUE (comercio_id, slug),

    INDEX idx_produtos_nome (nome),
    INDEX idx_produtos_categoria (categoria_id),
    INDEX idx_produtos_ativo (ativo)
);


-- =========================================================
-- 7. ESTOQUE
-- =========================================================

CREATE TABLE IF NOT EXISTS estoque (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    produto_id INT UNSIGNED NOT NULL,

    quantidade INT NOT NULL DEFAULT 0,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_estoque_produto
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_estoque_produto
        UNIQUE (produto_id),

    CONSTRAINT chk_estoque_quantidade
        CHECK (quantidade >= 0)
);


-- =========================================================
-- 8. CLIENTES
-- =========================================================

CREATE TABLE IF NOT EXISTS clientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    telefone VARCHAR(30) NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_clientes_nome (nome)
);


-- =========================================================
-- 9. ENDEREÇOS
-- =========================================================

CREATE TABLE IF NOT EXISTS enderecos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    cliente_id INT UNSIGNED NOT NULL,

    cep VARCHAR(9) NOT NULL,

    street VARCHAR(200) NOT NULL,

    number VARCHAR(20) NOT NULL,

    complement VARCHAR(150) NULL,

    neighborhood VARCHAR(150) NOT NULL,

    city VARCHAR(150) NOT NULL,

    state CHAR(2) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_enderecos_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_enderecos_cliente (cliente_id),
    INDEX idx_enderecos_cep (cep)
);


-- =========================================================
-- 10. PEDIDOS
-- =========================================================

CREATE TABLE IF NOT EXISTS pedidos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    cliente_id INT UNSIGNED NOT NULL,

    endereco_id INT UNSIGNED NOT NULL,

    status ENUM(
        'PENDENTE',
        'AGUARDANDO_PAGAMENTO',
        'PAGO',
        'EM_PREPARACAO',
        'ENVIADO',
        'ENTREGUE',
        'CANCELADO'
    ) NOT NULL DEFAULT 'PENDENTE',

    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    frete DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_pedidos_cliente
        FOREIGN KEY (cliente_id)
        REFERENCES clientes(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_pedidos_endereco
        FOREIGN KEY (endereco_id)
        REFERENCES enderecos(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    INDEX idx_pedidos_cliente (cliente_id),
    INDEX idx_pedidos_status (status),
    INDEX idx_pedidos_created_at (created_at)
);


-- =========================================================
-- 11. ITENS DO PEDIDO
-- =========================================================

CREATE TABLE IF NOT EXISTS itens_pedido (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    pedido_id BIGINT UNSIGNED NOT NULL,

    produto_id INT UNSIGNED NOT NULL,

    quantidade INT UNSIGNED NOT NULL,

    preco_unitario DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_itens_pedido_pedido
        FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_itens_pedido_produto
        FOREIGN KEY (produto_id)
        REFERENCES produtos(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_item_quantidade
        CHECK (quantidade > 0),

    INDEX idx_itens_pedido_pedido (pedido_id),
    INDEX idx_itens_pedido_produto (produto_id)
);


-- =========================================================
-- 12. PAGAMENTOS
-- =========================================================

CREATE TABLE IF NOT EXISTS pagamentos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    pedido_id BIGINT UNSIGNED NOT NULL,

    metodo ENUM(
        'PIX',
        'CARTAO_CREDITO',
        'CARTAO_DEBITO',
        'BOLETO'
    ) NOT NULL,

    status ENUM(
        'PENDENTE',
        'PROCESSANDO',
        'APROVADO',
        'RECUSADO',
        'CANCELADO',
        'ESTORNADO'
    ) NOT NULL DEFAULT 'PENDENTE',

    valor DECIMAL(10,2) NOT NULL,

    transaction_id VARCHAR(255) NULL,

    paid_at DATETIME NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_pagamentos_pedido
        FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_pagamentos_pedido (pedido_id),
    INDEX idx_pagamentos_status (status),
    INDEX idx_pagamentos_transaction (transaction_id)
);


-- =========================================================
-- 13. ENTREGAS
-- =========================================================

CREATE TABLE IF NOT EXISTS entregas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    pedido_id BIGINT UNSIGNED NOT NULL,

    servico VARCHAR(100) NOT NULL,

    codigo_servico VARCHAR(50) NULL,

    prazo_dias INT UNSIGNED NULL,

    valor DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    codigo_rastreio VARCHAR(100) NULL,

    status ENUM(
        'AGUARDANDO',
        'CALCULANDO',
        'PREPARANDO',
        'ENVIADO',
        'EM_TRANSITO',
        'ENTREGUE',
        'CANCELADO'
    ) NOT NULL DEFAULT 'AGUARDANDO',

    data_envio DATETIME NULL,

    data_entrega DATETIME NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_entregas_pedido
        FOREIGN KEY (pedido_id)
        REFERENCES pedidos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    INDEX idx_entregas_pedido (pedido_id),
    INDEX idx_entregas_status (status),
    INDEX idx_entregas_rastreio (codigo_rastreio)
);