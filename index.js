const express = require ('express');
const mongoose = require ('mongoose');

const app = express();

mongoose.connect('mongodb+srv://diego:di1515mo@cluster0-squkz.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());

// Principais métodos (verbos) http - get, post, put, delete

// Tipos de parametros:
// Query Params: req.query (Filtros, ordenação, paginação, ...)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional) na nuvem com MongoDB Atlas

app.post('/users', (req, resp) => {
    console.log(req.body);
    return resp.json({ message: 'Hello omnistack!' });

});

app.listen(3333);