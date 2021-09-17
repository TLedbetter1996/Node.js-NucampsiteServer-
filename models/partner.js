// create a Mongoose Schema (define Mongoose and schema, and then create a schema )
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const partnerSchema = new Schema({
    name: {
        required: true, 
        type: String
    },

    image:{
        required: true,
        type: String
    },

    featured:{
       type: Boolean,
       default: false
    }, 

    description: {
        required: true,
        type: String
    },
    }, {
        timestamps: true
    });

const Partner = mongoose.model('Partner', partnerSchema)

module.exports = Partner; 