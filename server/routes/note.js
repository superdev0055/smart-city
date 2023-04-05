var express = require('express');
var router = express.Router();
var Note = require("../models/prediction_note");

/* GET users listing. */

router.post('/', (req, res) => {
    var db = req.db
    var delegation = req.body.delegation
    var user = req.body.user
    console.log(req.body)
    note = new Note({
        delegation: delegation,
        user : user ,
        status : req.body.status
    })

      note.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({  note
        })
    })
})

router.get('/', (req, res) => {
    Note.find({}, function (error, feedbacks){
    if (error) { console.error(error); }
    res.send({
        Notes: feedbacks
    })
}).sort({_id:-1}).populate('user')
})
module.exports = router;
