var fs = require('fs');
var md5 = require('MD5');
/*
* Quick and dirty "database" implementation based on a json file as backend.
* Supports simply adding and deleting of entries
*/
module.exports.Store = function() {
  /* Private fields */
  var storePath = "./storage/storage.json";
  var store = {};

  /*Private methods*/
  var saveDB = function() {
    fs.writeFile(storePath, JSON.stringify(store), function (err) {
      if (err) return console.log(err);
    });
  };

  var initDB = function() {
    store = {'db': {}, 'iterator': []};

    if (fs.existsSync(storePath)) {
      data = fs.readFileSync(storePath, {"encoding": "utf8"});
      if (data != "") {
        store = JSON.parse(data);
      }
    }
    saveDB();
    console.log("LOGGING: Database inited to: " + store);
  }();

  var checkDuplicate = function(key) {
    return key in store.db;
  };

  /*Public methods*/
  this.getStorage = function() {
    return store;
  };

  this.addEntry = function(_title, _data) {
    _timestamp = Date.now();
    _id = md5(_timestamp + _title);
    if(checkDuplicate(_id)) {
      warning = "ERROR: The item you tried to save seems to have the same ID as an item already present in the DB. This means it has the exact same title and timestamp as another set of data already put in to the DB";
      console.log(warning);
    } else {
      store.db[_id] = {'title': _title, 'data': _data, 'todo_state': "", 'isDone': false, 'timestamp': _timestamp};
      store.iterator.push({id: _id, title: _title, data: _data, 'todo_state': "", 'isDone': false, timestamp: _timestamp});

      saveDB();
    }
  };

  this.markDone = function(_id) {
    if(!store.db[_id].isDone) {
      store.db[_id].todo_state = "done";
      store.db[_id].isDone = true;
      for(e in store.iterator) {
        if(store.iterator[e].id=== _id) {
          store.iterator[e].todo_state = "done";
          store.iterator[e].isDone = true;
        }
      }
      saveDB();
    } else {
      console.log("LOG: Entry already marked done");
    }
  }

  this.deleteEntry = function(_id) {
    delete store.db[_id];
    for(e in store.iterator) {
      if(store.iterator[e].id === _id) {
        store.iterator.splice(e, 1);
        break;
      }
    }
    saveDB();
  };

  this.getEntries = function() {
    return JSON.parse(JSON.stringify(store.iterator));
  };

};
