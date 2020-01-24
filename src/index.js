const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const http = require('http');
const routes = require ('./routes');
const { setupWebsocket } = require('./websocket');

// Instanciando o express para váriavel app

const app = express();

// Separando o HTTP na variavel server

const server = http.Server(app);

setupWebsocket(server);

// Usaremos o MongoDB (Não-relacional) na nuvem com MongoDB Atlas
// Iniciando conexão com o MongoDB Atlas usando a dependencia mongoose

mongoose.connect('mongodb+srv://diego:di1515mo@cluster0-squkz.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Cross-origin resource sharing (CORS ou compartilhamento de recursos de origem cruzada) é uma especificação de uma tecnologia de navegadores
// que define meios para um servidor permitir que seus recursos sejam acessados por uma página web de um domínio diferente.

// Usando o cors para liberar acesso ao nosso backend

app.use(cors());

// Informando que a aplicação usará o formato JSON como recebimento e envio de dados

app.use(express.json());

// Informando que a aplicação usará as rotas que foram criadas no arquivo routes.js e importada no inicio deste arquivo na linha 3

app.use(routes);

// Informando que a aplicação irá rodar na porta 3333

server.listen(3333);
