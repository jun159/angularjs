(function() {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', '$filter'];

  function LunchCheckController($scope, $filter) {
    $scope.message = "";

    // Checks inclusive of empty item , ,
    $scope.checkIfTooMuch = function() {
      if (!$scope.dishes) {
        $scope.message = "Please enter data first";
      } else if ($scope.dishes.split(',').length <= 3) {
        $scope.message = "Enjoy!";
      } else if ($scope.dishes.split(',').length > 3) {
        $scope.message = "Too much!";
      }
    };
  }
})();
