const Dev = require ('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, resp) {
        // Buscar todos os devs num raio de 10km e filtrar por tecnologias

        // Recebendo os paramentros de busca no query do GET da rota /search e armazenando em váriaveis separadas usando atribuição via desestruturação

        const { latitude, longitude, techs } = req.query;

        // Tratando as tecnologias informadas pelo usuário no query que foram informadas como string, com o método parseStringAsArray criado anteriormente
        
        const techsArray = parseStringAsArray(techs);

        // Buscando no BD registro com os parametros informados
        // Operador $in: busca algum registro com o valor informado
        // Operador $near: busca localidades próximas, devem ser informados parametros complementares para comparação
        // Operador $geometry: recebe as coordenadas que usamos para teste no insomnia para simular localização do usuário que está realizando a busca
        // Operador $maxDistance: determina a distância máxima em metros que o dev deve estar para ser relacionado na busca

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        // Retorna as informações obtidas na query do BD em formato JSON

        return resp.json(devs);

    }

};