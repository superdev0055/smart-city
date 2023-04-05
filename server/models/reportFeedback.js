var mongoose = require("mongoose");
var Schema = mongoose.Schema;





var reportFeedbackSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
     feedback:{type:mongoose.Schema.Types.ObjectId,ref:'Feedback'},


});

var ReportFeedback = mongoose.model("ReportFeedback", reportFeedbackSchema);
module.exports = ReportFeedback;