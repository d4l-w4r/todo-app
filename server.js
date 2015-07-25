// server set up ==========================================
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var store = require('./storage/store');

// configuration ===========================================
var app = express(); //express app
var storeObj = new store.Store(); //handle for db
// express config
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// set up routes ============================================
app.get('/api/todos', function(req, res) {
  //get all todos
  data = storeObj.getEntries();
  res.json(data);
});

app.post('/api/todos', function(req, res) {
  //add a new todo & return updated storage
  console.log(req);
  storeObj.addEntry(req.body.todoTitle, req.body.todoBody);
  res.json(storeObj.getEntries());
});

app.delete('/api/todos/:todo_id', function(req, res) {
  //delete a specific todo & return updated storage
  storeObj.deleteEntry(req.params.todo_id);
  res.json(storeObj.getEntries());
});

app.put('/api/todos/:todo_id', function (req, res) {
  //mark a specific todo as done
  storeObj.markDone(req.params.todo_id);
  res.json(storeObj.getEntries());
});

// start listening on port 1337
app.listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
