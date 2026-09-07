const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        author : {
            type : String ,
            required : true 
        },
        category : {
            type : String
        },
        available : {
            type : String
        },
        issuedTo : {
            type: String,
            default: null
        }
    });
    module.exports = mongoose.model('Books' , bookSchema);