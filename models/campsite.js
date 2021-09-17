// defining mongoose schema 
const mongoose = require('mongoose');
// making short hand to call mongoose schema just schema 
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    }, //updating comment schema with ObjectId and ref of User
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
});

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    elavation: {
        type: Number, 
        required: true,
        min: 0 
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

// "Desugared" class that opporates like a object (mongoose came before JS6 so it doesnt have them... apparently ). REMEMBER THE DRAGON CLAS???? REMEMBER!Q!!"?"
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;