(function(){
  var app = angular.module('todos', ['ngSanitize']);

  app.controller('navigationController', function() {
    //does nothing yet. Will handle searches & new notes
    return;
  });

  app.controller('todoListController',['$http', function($http){
    var store = this;
    this.todos = [];

    $http.get('http://127.0.0.1:1337/api/todos').success(function(data, status, headers, config) {
        store.todos = JSON.parse(JSON.stringify(data));
      }).error(function(data, status, headers, config) {
        console.log("ERROR: " + status + ". " + data);
      });
  }]);

})();
