'use strict';

/**
 * @ngdoc function
 * @name movieappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the movieappApp
 */
angular.module('movieappApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
