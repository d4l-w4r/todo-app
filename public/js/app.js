(function(){
  var uiDir = '../assets/ui-elements/';
  var app = angular.module('todos', ['ngSanitize']);

  app.controller("mainController", ['$http', '$scope', function ($http, $scope) {
    $scope.formHidden = true;
    $scope.newTodo = {};

    $http.get('http://127.0.0.1:1337/api/todos').success(function(data, status, headers, config) {
        $scope.todos = JSON.parse(JSON.stringify(data));
        console.log("LOG: Successfuly set up data from DB");
      }).error(function(data, status, headers, config) {
        console.log("ERROR: " + status + ". " + data);
      });

    $scope.openTodoForm = function () {
      console.log("LOG: Unhiding todo creation form");
      $scope.formHidden = false;
    }

    $scope.deleteTodo = function(id) {
      console.log("LOG: Delete todo " + id)
      $http.delete('http://127.0.0.1:1337/api/todos/' + id).success(function(data, status, headers, config) {
          console.log("LOG: Delete successful!");
          $scope.todos = data;
        }).error(function(data, status, headers, config) {
          console.log("ERROR: " + status + ". " + data);
        });
    }

    $scope.saveNewTodo = function(){
      $http.post('http://127.0.0.1:1337/api/todos', {"todoTitle": $scope.newTodo.todoTitle, "todoBody": $scope.newTodo.todoBody}).
      success(function (data, status, headers, config) {
        console.log("LOG: Successfuly saved todo: " + $scope.newTodo.todoTitle);
        $scope.newTodo = {};
        $scope.formHidden = true;
        $scope.todos = data;
      }).
      error(function (data, status, headers, config) {
        console.log("ERROR: " + status + ". " + data);
      });
    }

    $scope.discardNewTodo = function () {
      console.log("LOG: Discarding todo, clearing and hiding form");
      $scope.newTodo = {};
      $scope.formHidden = true;
    }

    $scope.editTodo = function (id) {
      console.log("LOG: Trying to edit todo: " + id);
      //implementation missing
    }

    $scope.markDone = function(id) {
      console.log("LOG: Trying to mark todo " + id + " as done");
      //implementation missing
    }

  }]);
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

  app.directive("overlayMenu", function () {
    return {
      restrict: 'E',
      templateUrl: uiDir + 'overlay-menu.html'
    };
  });

})();
