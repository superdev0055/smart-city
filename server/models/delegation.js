var mongoose = require('mongoose');


var delegationSchema = new mongoose.Schema({
    gouvernerat:{
        type: String, required: true, minlength: 1, trim: true
    },
    nom:{
        type: String, required: true, minlength: 1, trim: true
    },
    population:{type:Number,required: true},
    nbrBraquage:{type:Number,default:null},
    Weight:{type:Number,default:null},
    
    
});
module.exports= mongoose.model('Delegation',delegationSchema);