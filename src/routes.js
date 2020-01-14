const { Router } = require ('express');
const DevController = require ('./controllers/DevController');
const SearchController = require ('./controllers/SearchController');

// Instanciando o metodo Router() importado do express

const routes = Router();

// Principais métodos (verbos) http - get, post, put, delete

// Tipos de parametros:
// Query Params: req.query (Filtros, ordenação, paginação, ...)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

// Criando rota GET /devs para listar Devs com o método index do DevController

routes.get('/devs', DevController.index);

// Criando rota POST /devs para receber e cadastrar os Dev com o método store do DevController

routes.post('/devs', DevController.store);

// Criando rota GET /search para buscar devs conforme os parametros informados usando o método index do SearchController

routes.get('/search', SearchController.index);

module.exports = routes;
