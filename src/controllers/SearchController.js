const Dev = require ('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, resp) {
        // Buscar todos os devs num raio de 10km e filtrar por tecnologias

        const { latitude, longitude, techs } = req.query;

        // Tratando as tecnologias informadas pelo usuário no query que foram informadas como string, com o método parseStringAsArray criado anteriormente
        
        const techsArray = parseStringAsArray(techs);

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

        return resp.json({ devs });

    }
};