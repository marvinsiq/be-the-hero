# Be The Hero

Projeto resultante da Semana OmniStack 11.0.

## O Projeto

Be the hero é uma aplicação para conectar pessoas que tem vontade de ajudar ONGs.  
As ONGs se cadastram via aplicação web.  
Elas cadastram os casos informando um título, a descrição e o valor desejado.  
Através de um aplicativo mobile as pessoas conseguem visualizar os casos e podem entrar em contato através de email ou WhatsApp.  

### Entidades
* ONG
* Caso (incident)

### Funcionalidades
Web
* Login de ONGs
* Logout de ONGs
* Cadastro de ONG
* Cadastro de novos casos
* Lista de casos específicos de uma ONG
* Exclusão de casos

Mobile
* Lista de todos os casos
* Entre em contato com a ONG

## Criando o módulo Backend

### Para inicializar um projeto node

```bash
npm init -y
```

Este comando irá criar o arquivo package.json com as configurações do projeto.
A opção -y aceita todas as perguntas com a opção padrão.

### Instalando o express

O Express é um framework para criar aplicações web com Node.js. Para instalar digite o comando:

```bash
npm install express
```

### Criando a aplicação

Crie o arquivo src/index.js com o código:

```javascript
const express = require('express');

const app = express();


app.get('/', (request, response) => {
    return response.json({ "nome": "Marcus" });
});

const port = 3333;
app.listen(port, () => {
    console.log(`Server runnig on http://localhost:${port}`);
});
```

O código acima inicia um sevior na porta 3333 com o express e configura uma rota padrão "/" retornando um json.

### Executando o projeto

Para executar o código basta iniciar o projeto com o node. Para testar basta acessar o endereço http://localhost:3333

```
node src/index.js
```

### Instalando o nodemon

Sempre que alteramos nosso projeto é necessário parar o servidor e inicia-lo novamente com o node. Para automatizar esse processo utilizamos o nodemon.

nodemon é uma ferramenta que auxilia no desenvolvimento reiniciando automaticamente a aplicação quando alguma alteração de arquivo do projeto é detectada.

Para instalar basta digitar o comando:

```
npm install nodemon -g
```

A opção -g instala o módulo de forma global. Isso significa que o nodemon estará disponível para outros projetos.

Para executar aplicação com o nodemon basta digitar o comando

```
nodemon index.js
```

Para configurar o nodemon como um script do node basta editar o package.json adicionando:

```javascript
  "scripts": {
    "start": "nodemon src/index.js"
  },
```

Dessa forma é possível iniciar a plicação com o comando:

```
npm start
```

### Configurando o banco de dados

#### Instalando o [knex ](http://knexjs.org/)

Knex é um módulo de SQL Query Builder. 

```
npm install knex
```

#### Instalando o driver do banco SQLite

```
npm install sqlite3
```

#### Configurando o knex

```
npx knex init
```

Será gerado o arquivo `knexfile.js` com as configurações para cada ambiente.
Para visualizar todos os comandos disponíveis do knex digite apenas:

```
npx knex
```

Crie o diretório src/database e no arquivo `knexfile.js` configure o nome do banco de dados através da propriedade `filename`:

```
filename: './src/database/db.sqlite'
```

#### Migrations

http://knexjs.org/#Migrations

Adicione as propriedades  no arquivo `knexfile.js`:

```
    migrations: {
      directory: './src/database/migrations'
    }
```

Para criar um arquivo de migration:

```
npx knex migrate:make create_ongs
```

Configurando o arquivo de migrate:

Criando a entidade ongs

```javascript
exports.up = function(knex) {
    return knex.schema.createTable("ongs", table => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
```

Executando a migrate

```
npx knex migrate:latest
```

Se algo der errado, para desfazer a última execução basta digitar

```
npx knex migrate:rollback
```

Criando a entidade incidents

```
npx knex migrate:make create_incidents
```

```javascript
exports.up = function(knex) {
    return knex.schema.createTable("incidents", table => {
        
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();
        
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("incidents");
};
```


#### Criando a conexão

Criar o arquivo src/database/connection.js

```javascript
const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;
```

Quando precisar de usar a connection basta importar o módulo

```javascript
const connection = require('../database/connection');
```


### Configurando as rotas

#### Cadastro de ONGs

```javascript
routes.post('/ongs', async (request, response) => {

    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id, name, email, whatsapp, city, uf
    });

    return response.json({ id });
});
```

O comando `crypto.randomBytes(4).toString('HEX')` gera 4 bites de caracteres aleatórios e converte para string em caracteres hexadecimais.

Json de exemplo para cadastrar uma ONG

```javascript
{
	"name": "APAD",
	"email": "contato@apad.com.br",
	"whatsapp": "3101234589",
	"city": "Belo Horizonte",
	"uf": "MG"
}
```

#### Listagem de ONGs

```javascript
routes.get('/ongs', async (request, response) => {
    const ongs = await connection('ongs').select("*");
    return response.json(ongs);
});
```

### Configurando Cors

```
npm install cors
```

No `index.js`

```
const cors = require('cors');
...
app.use(cors());
```