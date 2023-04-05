var express = require('express');
var router = express.Router();
var Feedback = require("../models/feedback");
var Incident = require("../models/incident");
var User = require("../models/user");
var ReportFeedback = require("../models/reportFeedback");




// Add new feedback
router.post('/addFeedback', (req, res) => {
    var db = req.db;
var title = req.body.title;
var description = req.body.description;
var user = req.body.user._id;
var degree = req.body.degree;
console.log(req.body)
Incident.findOne({Title:req.body.incident}, '', function (error, incident) {
    if (error) { console.error(error); }


    var new_feedback = new Feedback({
        title: title,
        description: description,
        incident : incident,
        user : user ,
        status : 'enabled',
        degree : degree
    })

    new_feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})
})





// Fetch all feedbacks
router.get('/getAllFeedbacks', (req, res) => {
    Feedback.find({},'', function (error, feedbacks){
    if (error) { console.error(error); }
    res.send({
        feedbacks: feedbacks
    })
}).sort({_id:-1}).populate('user').populate('comments.user')
})


// Fetch all feedbacksreports
router.get('/getAllreports/:idU', (req, res) => {
    ReportFeedback.find({'user':req.params.idU},'feedback', function (error, feedbacks){
    if (error) { console.error(error); }
    res.send({
        reports: feedbacks
    })
})
})


// Search feedbacks
router.get('/searchFeedback/:tag', (req, res) => {
    Feedback.find({'title':new RegExp(req.params.tag,"i")}, function (error, feedbacks){
    if (error) { console.error(error); }
    res.send({
        feedback: feedbacks
    })
}).populate('user')
})




// report feedback
router.post('/reportFeedback/:idF/:idU', (req, res) => {
    var user = req.params.idU;
var feedback = req.params.idF;
var reportFeedback = new ReportFeedback({
    user: user,
    feedback: feedback

})
reportFeedback.save(function (error) {
    if (error) {
        console.log(error)
    }
    Feedback.findById(req.params.idF, '', function (error, feedback) {
        if (error) { console.error(error); }

        feedback.reports = feedback.reports + 1 ;


        feedback.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})
})



// Fetch single feedback
router.get('/feedback/:id', (req, res) => {
    var db = req.db;
Feedback.findById(req.params.id, '', function (error, feedback) {
    if (error) { console.error(error); }
    res.send(feedback)
}).populate('user').populate('comments.user')
})

// Get long and alt of incident of feedback
router.get('/feedback/incident/:place', (req, res) => {
    var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyB6kQ8I9KIPciT0EXioBjk91Nl_iQA6gQ8', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

// Or using Promise
geocoder.geocode({address: req.params.place}, function(req, resGeo) {

    res.send({
        longitude: resGeo[0].longitude,
        latitude : resGeo[0].latitude
    })

});
})




// Update a feedback
router.put('/feedback/:id', (req, res) => {
    var db = req.db;
Feedback.findById(req.params.id, '', function (error, feedback) {
    if (error) { console.error(error); }

    feedback.title = req.body.title
    feedback.description = req.body.description
    feedback.degree = req.body.degree

    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})
})


// Delete a feedback
router.put('/delete/feedback/:id', (req, res) => {
    var db = req.db;
Feedback.findById(req.params.id, '', function (error, feedback) {
    if (error) { console.error(error); }

    feedback.status = 'disabled'

    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})
})




// Get the last feedback
router.get('/getLastFeedback', (req, res) => {
    Feedback.find({status:'enabled'}, '', function (error, feedbacks) {
    if (error) { console.error(error); }
    res.send({
        feedbacks: feedbacks
    })
}).sort({date:-1}).limit(1)
})










// Add new comment
router.put('/feedback/:id/addComment', (req, res) => {
    var db = req.db;
Feedback.findById(req.params.id, '', function (error, feedback) {
    if (error) { console.error(error); }
    if (!Array.isArray(feedback.comments)) {
        feedback.comments = [];
    }
    feedback.comments.push({
        content: req.body.content,
        user: req.body.user._id
    })
    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
})
})

// Delete a comment
router.get('/feedback/:idF/deleteComment/:idC', (req, res) => {
    Feedback.findOne({'_id': req.params.idF}, function (err, feedback) {
    feedback.comments.id(req.params.idC).remove();
    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
});
})




// Get a comment from feedbacl
router.get('/feedback/:idF/getComment/:idC', (req, res) => {
    Feedback.findOne({'_id': req.params.idF}, function (err, feedback) {
    var comment=feedback.comments.id(req.params.idC);
    res.send({
        comment: comment
    })
})
})



// Update a comment
router.get('/feedback/:idF/updateComment/:idC/:content', (req, res) => {
    Feedback.findOne({'_id': req.params.idF}, function (err, feedback) {
    feedback.comments.id(req.params.idC).content=req.params.content;
    feedback.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true
        })
    })
});
})



module.exports = router;
