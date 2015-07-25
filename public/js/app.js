(function(){
  var uiDir = '../assets/ui-elements/';
  var app = angular.module('todos', ['ngSanitize']);

  app.controller("mainController", ['$http', '$scope', function ($http, $scope) {
    $scope.formHidden = true;
    $scope.isEdit = false;
    $scope.newTodo = {};
    $scope.current_edit_id = "";

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

    $scope.saveEditedTodo = function () {
      console.log("LOG: Trying to save edit");

      $http.put('http://127.0.0.1:1337/api/todos/edit/' + $scope.current_edit_id, {"todoTitle": $scope.newTodo.todoTitle, "todoBody": $scope.newTodo.todoBody}).
      success(function (data, status, headers, config) {
        console.log("LOG: Successfuly saved todo: " + $scope.newTodo.todoTitle);
        $scope.newTodo = {};
        $scope.isEdit = false;
        $scope.formHidden = true;
        $scope.current_edit_id = "";
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
      $scope.current_edit_id = "";
    }

    $scope.editTodo = function (id) {
      console.log("LOG: Trying to edit todo: " + id);
      for(e in $scope.todos) {
        if($scope.todos[e].id === id) {
          $scope.newTodo.todoTitle = $scope.todos[e].title;
          $scope.newTodo.todoBody = $scope.todos[e].data;
          $scope.isEdit = true;
          $scope.current_edit_id = id;
          $scope.formHidden = false;
        }
      }
    }

    $scope.markDone = function(id) {
      console.log("LOG: Trying to mark todo " + id + " as done");
      $http.put('http://127.0.0.1:1337/api/todos/' + id).success(function(data, status, headers, config) {
          console.log("LOG: Todo marked as done.");
          $scope.todos = data;
        }).error(function(data, status, headers, config) {
          console.log("ERROR: " + status + ". " + data);
        });
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
