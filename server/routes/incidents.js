var express = require('express');
var router = express.Router();
var Incident = require("../models/incident");



router.get('/getAllIncidents', (req, res) => {
    Incident.find({}, 'Title Description Date adress type', function (error, incidents) {
    if (error) { console.error(error); }
    res.send({
        incidents: incidents
    })
}).sort({_id:-1})
})



router.get('/getIncidentByTitle/:title', (req, res) => {
    Incident.findOne({Title:req.params.title}, '', function (error, incident) {
    if (error) { console.error(error); }
    res.send({
        incident: incident
    })
}) })

module.exports = router;
