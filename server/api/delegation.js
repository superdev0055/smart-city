var mongoose = require('mongoose');
var ObjectID = require('mongoose').Types.ObjectId;
var express = require('express');
var fs = require('fs');

var router = express.Router();
var Delegation = require('./../models/delegation');

router.post('/',function(req,res){
    console.log(req.body);
    var delegation = new Delegation(req.body);
    delegation.save().then(function(delegation){
        res.send(delegation);
    }).catch(function(err){
        res.status(400).send(err);
    })
});
// router.get('/add', function(req, res){

//     allIncidents = JSON.parse(fs.readFileSync('pop.json'));
//     for (var i = 0; i < allIncidents.length; i++) {

//        var incident=new Delegation({
//             "population":allIncidents[i].population,
//             "nom":allIncidents[i].nom,
//             "gouvernerat": allIncidents[i].gouvernerat,
//             "nbrBraquage":allIncidents[i].nbrBraquage,
//             "Weight": allIncidents[i].Weight,
//             //, "createdBy":{}
//         });
//         incident.save(function (err,incident) {
//             if (err)
//                 console.log(err);
//             else
//                 console.log("yessss");
//         })
//     }
//     res.send("Check your data base : piStack");



// });
module.exports = router;