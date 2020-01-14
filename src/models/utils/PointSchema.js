const mongoose = require ('mongoose');

// criando o type para a localização (location) que será informadas no DevSchema para o BD

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;