const axios = require ('axios');
const Dev = require ('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// O controller geralmente possui 5 funções:
// Index: Quando queremos mostrar uma lista dos registros do recurso em questão (Dev)
// Show: Quando queremos mostrar um unico registro do recurso
// Store: Quando queremos criar um novo registro no recurso 
// Update: Quando queremos atualizar um registro do recurso
// Destroy: Quando queremos deletar um registro do recurso

module.exports = {

    // Função index para listar todos os registros do recurso (Dev)

    async index(req, resp) {

        // Buscando registro no BD, também pode ser informados parametros para consulta

        const devs = await Dev.find();

        // Retornando os dados em formato JSON

        return resp.json(devs);
    },

    // Função store para armazenar novo registro do recurso (Dev)

    async store(req, resp) {

        // Recebendo as informações de cadastro do POST da rota /devs através do body da requisição e armazenando em váriaveis separadas usando atribuição via desestruturação

        const { github_username, techs, latitude, longitude } = req.body;

        // Buscando registro que já possua o github_username cadastrado e retornando o resultado na variável de escopo (let) dev

        let dev = await Dev.findOne({ github_username });

        // Verificando se a variável dev não (!) possui conteúdo (caso haja registro ela terá conteúdo, caso não haja ela estará vazia)

        if (!dev) {

            // Usando o axios para receber a API do github passando o github_username enviado pelo usuário no body da requisição

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            // Recebendo as informações da propriedade data da API do github e armazenando em váriaveis separadas usando atribuição via desestruturação
    
            const { name = login, avatar_url, bio } = apiResponse.data;

            // Tratando as tecnologias informadas pelo usuário no body que foram informadas como string, com o método parseStringAsArray criado anteriormente
        
            const techsArray = parseStringAsArray(techs);

            // Tratando as coordenadas recebidas pelo usuário para armazenar no BD conforme documentação do mongoose
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            // Criando registro no BD após todas as verificações e tratamentos 
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // Filtrar as conexões que estão há no máximo 10km de distância e que o novo dev tenho uma das tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
                
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        // Retornando o novo registro no formato JSON

        return resp.json(dev);

    },

    // Função destroy para eliminar registro do recurso (dev)

    async destroy(req, resp) {

        // Recebendo ID do query

        const { id } = req.query;

        // Excluindo o dev selecionado

        dev = await Dev.findByIdAndDelete({ _id: id });

        // Retornando mensagem para confirmar a exclusão

        return resp.json('Dev excluido com sucesso!');

    },

    // Função destroy para eliminar registro do recurso (dev)

    async update(req, resp) {

        // Recebendo ID do query

        const { id } = req.query;

        // Recebendo os campos a serem atualizados do body

        const { github_username, techs, latitude, longitude } = req.body;

        // Usando o axios para receber a API do github passando o github_username enviado pelo usuário no body da requisição

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        // Recebendo as informações da propriedade data da API do github e armazenando em váriaveis separadas usando atribuição via desestruturação

        const { avatar_url, bio } = apiResponse.data;

        // Tratando as tecnologias informadas pelo usuário no body que foram informadas como string, com o método parseStringAsArray criado anteriormente
    
        const techsArray = parseStringAsArray(techs);

        // Tratando as coordenadas recebidas pelo usuário para armazenar no BD conforme documentação do mongoose
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        // Atualizando o dev selecionado conforme dados recebidos

        dev = await Dev.findByIdAndUpdate({ _id: id }, {
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        // Retornando dados do dev conforme atualização

        return resp.json(dev);
    }
};
