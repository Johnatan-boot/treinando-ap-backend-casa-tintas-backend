# 🎨 Casa de Tintas — Backend

API REST do projeto **Casa de Tintas**, desenvolvida para gerenciar clientes, endereços, categorias, produtos, pedidos e itens de pedidos.

O backend foi construído com **Node.js + Fastify + SQLite**, utilizando uma arquitetura organizada em camadas para facilitar manutenção, evolução e futura migração para **MySQL**.

---

## 📌 Status do Projeto

**Fase atual:** Backend — Estrutura principal e CRUD

**Status:** 🟢 Em desenvolvimento

### Módulos concluídos

* ✅ Categorias
* ✅ Produtos
* ✅ Clientes
* ✅ Endereços
* ✅ Pedidos
* ✅ Itens do Pedido
* ⏳ Pagamentos
* ⏳ Entregas
* ⏳ Funcionários
* ⏳ Regras completas de negócio
* ⏳ Integração completa com frontend
* ⏳ Migração para MySQL

---

# 🏗️ Arquitetura

O projeto utiliza uma arquitetura baseada em **MVC + Service + Repository**.

```text
Cliente
   │
   ▼
Routes
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Repository
   │
   ▼
SQLite
```

### Responsabilidade de cada camada

#### Routes

Responsável por definir os endpoints da API.

```text
src/routes/
```

Exemplo:

```text
GET    /api/clientes
GET    /api/clientes/:id
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id
```

---

#### Controllers

Responsáveis por receber as requisições HTTP, validar parâmetros básicos e devolver as respostas.

```text
src/controllers/
```

---

#### Services

Responsáveis pelas regras de negócio da aplicação.

```text
src/services/
```

---

#### Repositories

Responsáveis pela comunicação direta com o banco de dados.

```text
src/repositories/
```

---

#### Database

Responsável pela conexão e operações com o SQLite.

```text
src/database/
```

---

# 📂 Estrutura do Projeto

```text
casa-tintas-backend/
│
├── data/
│   └── casa-tintas.sqlite
│
├── src/
│   │
│   ├── controllers/
│   │   ├── categoria.controller.js
│   │   ├── cliente.controller.js
│   │   ├── endereco.controller.js
│   │   ├── item-pedido.controller.js
│   │   ├── pedido.controller.js
│   │   └── produto.controller.js
│   │
│   ├── database/
│   │   └── sqlite/
│   │       └── connection.js
│   │
│   ├── repositories/
│   │   ├── categoria.repository.js
│   │   ├── cliente.repository.js
│   │   ├── endereco.repository.js
│   │   ├── item-pedido.repository.js
│   │   ├── pedido.repository.js
│   │   └── produto.repository.js
│   │
│   ├── routes/
│   │   ├── categoria.routes.js
│   │   ├── cliente.routes.js
│   │   ├── endereco.routes.js
│   │   ├── item-pedido.routes.js
│   │   ├── pedido.routes.js
│   │   └── produto.routes.js
│   │
│   ├── services/
│   │   ├── categoria.service.js
│   │   ├── cliente.service.js
│   │   ├── endereco.service.js
│   │   ├── item-pedido.service.js
│   │   ├── pedido.service.js
│   │   └── produto.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# 🛠️ Tecnologias

| Tecnologia | Utilização               |
| ---------- | ------------------------ |
| Node.js    | Runtime                  |
| Fastify    | Framework HTTP           |
| SQLite     | Banco de dados atual     |
| sqlite3    | Driver SQLite            |
| CORS       | Comunicação com frontend |
| dotenv     | Variáveis de ambiente    |
| Git        | Controle de versão       |

---

# 🗄️ Banco de Dados

Atualmente o projeto utiliza:

```text
SQLite
```

Banco:

```text
data/casa-tintas.sqlite
```

### Tabelas atuais

```text
categorias
clientes
comercio
enderecos
entregas
funcionario_categorias
funcionarios
itens_pedido
pagamentos
pedidos
produtos
```

### Relacionamentos principais

```text
CATEGORIAS
     │
     ▼
PRODUTOS
     │
     ▼
ITENS_PEDIDO
     │
     ▼
PEDIDOS
     │
     ├──────────► CLIENTES
     │
     └──────────► ENDERECOS
```

---

# 🚀 Como executar

## 1. Clonar o projeto

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta:

```bash
cd casa-tintas-backend
```

---

## 2. Instalar dependências

```bash
npm install
```

---

## 3. Configurar ambiente

Crie o arquivo:

```text
.env
```

Exemplo:

```env
PORT=3001
```

---

## 4. Iniciar o servidor

```bash
npm start
```

Servidor:

```text
http://localhost:3001
```

---

# ❤️ Health Check

Para verificar se o backend está funcionando:

```bash
curl http://127.0.0.1:3001/health
```

Resposta esperada:

```json
{
  "success": true,
  "message": "Casa de Tintas Backend funcionando."
}
```

---

# 📡 API

## Clientes

```text
GET    /api/clientes
GET    /api/clientes/:id
POST   /api/clientes
PUT    /api/clientes/:id
DELETE /api/clientes/:id
```

---

## Categorias

```text
GET    /api/categorias
GET    /api/categorias/:id
POST   /api/categorias
PUT    /api/categorias/:id
DELETE /api/categorias/:id
```

---

## Produtos

```text
GET    /api/produtos
GET    /api/produtos/:id
POST   /api/produtos
PUT    /api/produtos/:id
DELETE /api/produtos/:id
```

---

## Endereços

```text
GET    /api/enderecos
GET    /api/enderecos/:id
POST   /api/enderecos
PUT    /api/enderecos/:id
DELETE /api/enderecos/:id
```

---

## Pedidos

```text
GET    /api/pedidos
GET    /api/pedidos/:id
POST   /api/pedidos
PUT    /api/pedidos/:id
DELETE /api/pedidos/:id
```

---

## Itens do Pedido

```text
GET    /api/itens-pedido
GET    /api/itens-pedido/:id
POST   /api/itens-pedido
PUT    /api/itens-pedido/:id
DELETE /api/itens-pedido/:id
```

---

# 🧪 Testes realizados

Os endpoints principais foram validados utilizando `curl`.

### Cliente

```bash
curl http://127.0.0.1:3001/api/clientes
```

### Produto

```bash
curl http://127.0.0.1:3001/api/produtos
```

### Endereço

```bash
curl http://127.0.0.1:3001/api/enderecos
```

### Pedido

```bash
curl http://127.0.0.1:3001/api/pedidos
```

### Item do pedido

```bash
curl http://127.0.0.1:3001/api/itens-pedido
```

---

# 🛒 Exemplo de criação de pedido

Criar pedido:

```bash
curl -X POST "http://127.0.0.1:3001/api/pedidos" \
-H "Content-Type: application/json" \
-d '{"cliente_id":4,"endereco_id":2,"subtotal":109.90,"frete":20.00,"total":129.90}'
```

Criar item:

```bash
curl -X POST "http://127.0.0.1:3001/api/itens-pedido" \
-H "Content-Type: application/json" \
-d '{"pedido_id":1,"produto_id":1,"quantidade":1,"preco_unitario":109.90,"subtotal":109.90}'
```

---

# 🔐 Validações

O backend já possui validações para situações como:

* ID inválido
* Cliente inexistente
* Item inexistente
* Dados obrigatórios ausentes
* Email duplicado
* Quantidade inválida
* Produto inválido
* Pedido inválido
* Conflitos de integridade do SQLite

As respostas seguem um padrão:

```json
{
  "success": false,
  "message": "Mensagem do erro."
}
```

---

# 📦 Padrão de resposta

### Sucesso

```json
{
  "success": true,
  "data": []
}
```

### Criação

```json
{
  "success": true,
  "message": "Registro criado com sucesso.",
  "data": {}
}
```

### Erro

```json
{
  "success": false,
  "message": "Descrição do erro."
}
```

---

# 🔄 Fluxo do E-commerce

O fluxo planejado para a aplicação é:

```text
Cliente
   │
   ▼
Endereço
   │
   ▼
Carrinho
   │
   ▼
Pedido
   │
   ├── Produtos
   │
   ├── Itens do Pedido
   │
   ├── Pagamento
   │
   └── Entrega
```

---

# 🧭 Roadmap

## Fase 1 — Estrutura

* [x] Fastify
* [x] SQLite
* [x] CORS
* [x] Variáveis de ambiente
* [x] Arquitetura em camadas

## Fase 2 — Cadastros

* [x] Categorias
* [x] Produtos
* [x] Clientes
* [x] Endereços

## Fase 3 — Pedidos

* [x] Pedidos
* [x] Itens do pedido
* [x] Relacionamento pedido/produto
* [x] CRUD completo

## Fase 4 — Financeiro

* [ ] Pagamentos
* [ ] Status de pagamento
* [ ] Integração com gateway

## Fase 5 — Logística

* [ ] Entregas
* [ ] Status da entrega
* [ ] Rastreamento

## Fase 6 — Regras de negócio

* [ ] Cálculo automático de subtotal
* [ ] Cálculo automático de frete
* [ ] Cálculo automático do total
* [ ] Atualização automática do estoque
* [ ] Validação de estoque disponível
* [ ] Transações
* [ ] Status do pedido

## Fase 7 — Integração

* [ ] Integração com frontend
* [ ] Autenticação
* [ ] Autorização
* [ ] Tratamento global de erros
* [ ] Documentação da API

## Fase 8 — Produção

* [ ] Migração SQLite → MySQL
* [ ] Configuração MySQL
* [ ] Deploy
* [ ] Variáveis de ambiente de produção
* [ ] Monitoramento
* [ ] Backup

---

# 🧱 Próxima etapa

O próximo módulo a ser implementado é:

```text
PAGAMENTOS
```

Seguindo o mesmo padrão:

```text
pagamento.routes.js
        ↓
pagamento.controller.js
        ↓
pagamento.service.js
        ↓
pagamento.repository.js
        ↓
SQLite
```

Depois serão implementados os módulos de **entregas** e **funcionários**.

---

# 📈 Objetivo arquitetural

O objetivo do projeto é evoluir de um backend local baseado em SQLite para uma API preparada para ambiente de produção utilizando:

```text
Frontend
   │
   ▼
REST API
   │
   ▼
Fastify
   │
   ├── Controllers
   ├── Services
   └── Repositories
           │
           ▼
         MySQL
```

A separação das responsabilidades permite substituir o banco de dados futuramente com menor impacto nas demais camadas da aplicação.

---

# 👨‍💻 Projeto

**Casa de Tintas**

Backend desenvolvido como parte da construção de uma aplicação de e-commerce para uma loja de tintas.

```text
Node.js
Fastify
SQLite
REST API
MVC + Service + Repository
```

---

## 📄 Licença

Projeto em desenvolvimento para fins de estudo e construção de portfólio.
