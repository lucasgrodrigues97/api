# Tarefa: Trabalho Final: Desenvolvimento de API REST com Node.js

## Instruções

### 1. Clonar o Repositório

Primeiro, clone o repositório do projeto:

```bash
git clone https://github.com/lucasgrodrigues97/api.git
cd puc-api
```
### 2. Instalar as Dependências

Usando **npm**:

```bash
npm install
```
Usando **yarn**:

```bash
yarn install
```
Esses comandos irão baixar todas as dependências listadas no arquivo package.json do projeto.

### 3. Rodar as Migrations

Antes de rodar o comando para criar as migrations, é importante criar os arquivos `.env` e `.env.test` e adicionar as variáveis de exemplo contidas nos arquivos `.env.example` e  `.env.test.example`.

```
NODE_ENV=development
DATABASE_URL='./db/db.sqlite'
DATABASE_CLIENT=sqlite
SECRET_KEY='A8213JIALA18923K'
```

Usando **npm**:

```bash
npx knex -- migrate:latest
```
Usando **yarn**:

```bash
yarn knex -- migrate:latest
```
Isso irá executar as migrações e criar as tabelas necessárias no banco de dados.

### 4. Executar o Servidor

Usando **npm**:

```bash
npm run dev
```
Usando **yarn**:

```bash
yarn dev
```
O servidor estará rodando em http://localhost:3000 (ou outra porta configurada no projeto). Agora você pode acessar e testar a API no seu navegador ou usar ferramentas como Postman, Insomnia ou HTTpie.

### 5. Rotas da API

**Método POST:** Parâmetros no corpo da requisição: {"name": "Example Name", "email": "example@gmail.com", "password": "12345678"}.
```bash
http://localhost:3000/users/register
```

**Método POST:** Parâmetros no corpo da requisição: {"email": "example@gmail.com", "password": "12345678"}.

**Será retornado um "accessToken" que deverá ser enviado no Header no momento de consumir todas as rotas de "movies"**
```bash
http://localhost:3000/authenticate
```

**Método GET:**
```bash
http://localhost:3000/movies
```

**Método GET:** Parâmetro na url da requisição será o id do filme que deseja buscar. Substitua ":id" pelo id do modelo.
```bash
http://localhost:3000/movies/:id
```

**Método POST:** Parâmetros no corpo da requisição: {"name": "Example Movie", "description": "Example Description", "director": "Example Director"}.
```bash
http://localhost:3000/movies
```

**Método PUT:** Parâmetro na url da requisição será o id do filme que deseja atualizar. Substitua ":id" pelo id do modelo.
```bash
http://localhost:3000/movies/:id
```

**Método DELETE:** Parâmetro na url da requisição será o id do filme que deseja deletar. Substitua ":id" pelo id do modelo.
```bash
http://localhost:3000/movies/:id
```
