const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    mainGenre: {
      type: String,
      required: true
    },
    genres: {
      type: String,
      required: true
    },
    time: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    fxseats: {
        type: Array,
        required: true
    }
});
module.exports = mongoose.model('Movieseats', MovieSchema);