const Dev = require ('../models/Dev');

module.exports = {

    async index(req, resp) {
        // Buscar todos os devs num raio de 10km e filtrar por tecnologias

        // Recebendo os paramentros de busca no query do GET da rota /search e armazenando em váriaveis separadas usando atribuição via desestruturação

        const { latitude, longitude } = req.query;

        // Buscando no BD registro com os parametros informados
        // Operador $in: busca algum registro com o valor informado
        // Operador $near: busca localidades próximas, devem ser informados parametros complementares para comparação
        // Operador $geometry: recebe as coordenadas que usamos para teste no insomnia para simular localização do usuário que está realizando a busca
        // Operador $maxDistance: determina a distância máxima em metros que o dev deve estar para ser relacionado na busca

        const devs = await Dev.find({
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