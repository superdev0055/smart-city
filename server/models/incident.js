
var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    place:{
        type: String, required: true, minlength: 1, trim: true
    },
    city:{type:String, required: true, minlength: 1, trim: true},
    coordinates: [Number],
    weight:Number,
    
});
var IncidentSchema = new mongoose.Schema({
    Title:{
        type: String, required: true, minlength: 1, trim: true
    },
    Description:{
        type: String, required: true, minlength: 1, trim: true
    },
    Date:{
        type:Date,default:Date.now
    },
    address: addressSchema,
    type:{
        type: String, required: true, minlength: 1, trim: true
    }

   ,createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});
module.exports= mongoose.model('Incident',IncidentSchema);