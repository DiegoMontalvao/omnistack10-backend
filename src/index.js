const express = require ('express');
const mongoose = require ('mongoose');
const routes = require ('./routes');

// Instanciando o express para váriavel app

const app = express();

// Usaremos o MongoDB (Não-relacional) na nuvem com MongoDB Atlas
// Iniciando conexão com o MongoDB Atlas usando a dependencia mongoose

mongoose.connect('mongodb+srv://diego:di1515mo@cluster0-squkz.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Informando que a aplicação usará o formato JSON como recebimento e envio de dados

app.use(express.json());

// Informando que a aplicação usará as rotas que foram criadas no arquivo routes.js e importada no inicio deste arquivo na linha 3

app.use(routes);

// Informando que a aplicação irá rodar na porta 3333

app.listen(3333);
