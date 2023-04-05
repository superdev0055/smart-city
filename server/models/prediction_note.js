var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./user')

var note = new Schema({

    date:{type:Date,default:Date.now},
    delegation : String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    status : Number
});

var note = mongoose.model("note", note);
module.exports = note;

