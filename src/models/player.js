const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, require:false},
    nombre: {type :String , require: true},
    puntaje: {type: Number, require:true},
});

module.exports = mongoose.model('Player', PlayerSchema);