(function(){
  var uiDir = '../assets/ui-elements/';
  var app = angular.module('todos', ['ngSanitize']);

  app.controller("mainController", function ($scope) {
    $scope.eatADick = function () {
      console.log("LOG: Add todo button clicked!");
    }
    
    $scope.raiseOverlayMenu = function() {
      console.log("LOG: Overlay menu button clicked!")
    }
  });
  app.directive("todoItem", function () {
    return {
      restrict : 'E',
      templateUrl : uiDir + 'todo-item.html'
    };
  });

  app.directive("searchBar", function(){
    return {
      restrict: 'E',
      templateUrl: uiDir + 'search-bar.html',
      controller: function() {
        //search functionality
      },
      controllerAs: 'srchCtrl'
    };
  });

  app.directive("addButton", function(){
    return {
      restrict: 'A',
      templateUrl: uiDir + 'add-button.html',
      controller: function(){
      },
      controllerAs: 'addCtrl'
    };
  });

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
