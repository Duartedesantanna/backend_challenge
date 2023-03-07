
# Descrição



API "backend challenge" desenvolvida para o processo da ClubPetro. Utilizando nest.js com typescript, typeORM e com o auxilio do Swager para gerar uma mini documentação.

## Instalação

Após clonar o repositório, para realizar a instalação basta acessar a pasta rais "BACKEND_CHALLENGE" e instalar as dependencias com o comando abaixo: 

```bash
$ npm install
```

## Banco de Dados

Antes de executar a API, precisamos ter acesso ao banco de dados Postgres. Dele vamos precisar do host, da porta, do username, do password e dodatabase. Com esses dados em mão, basta inserir ele no arquivo .env. Qualquer duvida, tem no diretório um arquivo .env de exemplo com os nomes da variaveis de ambiente já salva.

```bash
Exemplo:

DB_HOST=...
DB_PORT=...
DB_USERNAME=...
DB_PASSWORD=...
DB_DATABASE=...
```

## Executar a API

Agora que temos tudo configurado, podemos executar a api.Para isso podemos utilizar o comando:salva.


```bash
$ npm run start:dev
```
Nossa api irá executar na porta 3000. Para acessar a api basta acessar 

```bash
http://localhost:3000/swagger
```

