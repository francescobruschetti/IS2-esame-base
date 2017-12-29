const express = require('express'),
    bodyParser = require('body-parser');
const assignmentsx = express.Router()

var uuid = require('uuid-v4');

const deliveredAssignments = []


assignmentsx.get('/client', function (req, res) {
    res.sendfile("client.html");

})

assignmentsx.get('/list', function (req, res) {
    
	res.header('Content-Type', 'text/html');
    for(var i = 0; i < deliveredAssignments.length; i++)
	{
		res.write("<div><h3>"+deliveredAssignments[i].assignmentID+"</h3>");
		res.write("<form action='/activities/"+deliveredAssignments[i].assignmentID+"' method='get'><input type='submit' value='GET'></form>");
		res.write("<form action='/activities/"+deliveredAssignments[i].assignmentID+"' method='PUT'>");
		res.write("<input type='submit' value='PUT'></form>");		
		res.write("<form action='/activities/"+deliveredAssignments[i].assignmentID+"' method='del'><input type='submit' value='DEL'></form></div>");		
	}
	res.end();
})

assignmentsx.get('/', function (req, res) {
    //console.log('get, delivering:',deliveredAssignments)
    //TODO: check if there is a filter, and filter
    res.json(deliveredAssignments)
})

assignmentsx.post('/', function (req, res) {
	
    const newAssignment = req.body
    newAssignment.assignmentID = uuid()
    newAssignment.dateUpdated = new Date()
    deliveredAssignments.push(newAssignment)
    res.json(newAssignment)
})

assignmentsx.get('/:assignmentID', function (req, res) {
	console.log("Entra qui anche quando uso PUT e DELETE, perché http non consente il loro utilizzo nelle form. Se uso postman funziona. Devo provare a vedere apiary come si comporta.");
    const assignmentID = req.params.assignmentID
    const i = deliveredAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    if (i==-1) res.sendStatus(404)
    else {
        res.status=200
        res.json(deliveredAssignments[i])
    }
})

assignmentsx.put('/:assignmentID', function (req, res) {
	console.log("PUT");
    const assignmentID = req.params.assignmentID
    const i = deliveredAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    deliveredAssignments[i] = req.body
    deliveredAssignments[i].dateUpdated = new Date()
    res.json(deliveredAssignments[i])
})

assignmentsx.delete('/:assignmentID', function (req, res) {
	console.log("DELETE");
    const assignmentID = req.params.assignmentID
    if (!assignmentID) res.sendStatus(404)
    const i = deliveredAssignments.findIndex(item => {return item.assignmentID === assignmentID})
    const deleted = deliveredAssignments[i]
    deliveredAssignments.splice(i,1)
    res.sendStatus(204)
})

module.exports = assignmentsx