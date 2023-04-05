var express = require('express');
var router = express.Router();
var Incident = require("../models/incident");

var fs = require("fs");
population = JSON.parse(fs.readFileSync('/Users/firassahli/Desktop/4 TWIN 1 (1st semestre)/pifull/mevn-stack-ismail/server/data/population.json'));


router.get('/', (req, res) => {
    Incident.find({}).exec(function (err, todos) {
    if (err) {
        res.send(err)
        console.log('err')
    }
    if (!todos) {
        res.status(404).send();
        console.log('todos')
    }
    else {
        //replace ids with emails
        res.json(todos);
        console.log('json')
    }

})
})
/////delegation

router.get('/Gouvernerat', (req, res) => {
    var delegations = []
    for (var i = 0; i < population.populations.length; i++)
{
if (delegations.indexOf(population.populations[i].Gouvernerat)  === -1)
delegations.push(population.populations[i].Gouvernerat)
    //if (population.populations.Gouvernerat === "Tunis") {
       // console.log(population.populations[i])
  // }
}
res.json(delegations)

})
router.get('/delegation/:Gouvernerat', (req, res) => {
    var delegations = []
    for (var i = 0; i < population.populations.length; i++)
{

    if (delegations.indexOf(population.populations[i].Delegation)  === -1 && population.populations[i].Gouvernerat === req.params.Gouvernerat)
        delegations.push(population.populations[i].Delegation)
    //if (population.populations.Gouvernerat === "Tunis") {
    // console.log(population.populations[i])
    // }
}
res.send(delegations)

})
router.get('/alerts/:place', (req, res) => {

   var a = [];
   //a.address.place = "Tunis";
    Incident.find({}).exec(function (err, todos) {
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].address.place === req.params.place) {
                a.push(todos[i])
            }
        }

    if (err) {
        res.send(err)
        console.log('err')
    }
    if (!todos) {
        res.status(404).send();
        console.log('todos')
    }
    else {
        //replace ids with emails
        res.send(a);
        console.log('json')
    }

})
})




module.exports = router;
