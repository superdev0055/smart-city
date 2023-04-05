var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Incident = require('./incident')
var User = require('./user')

var addressSchema = new mongoose.Schema({
    place:{
        type: String
    },
    city:{type:String},
    coordinates: [Number],
    weight:Number,

});
var IncidentSchema = new mongoose.Schema({
    Title:{
        type: String
    },
    Description:{
        type: String
    },
    Date:{
        type:Date,default:Date.now
    },
    address: addressSchema,
    type:{
        type: String
    },

    // createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});






var commentSchema = mongoose.Schema({
    content:{type:String},
    date:{type:Date,default:Date.now},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},

});


var FeedbackSchema = new Schema({
    title: String,
    description: String,
    date:{type:Date,default:Date.now},
    comments : [commentSchema],
    incident : IncidentSchema,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    status : {type:String,default:'enabled'},
    degree : Number,
    reports :{type:Number,default:0}

});

var Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
