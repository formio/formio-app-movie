'use strict';

// Change this to your application URL.
var movieAppAPI = 'https://movieapp.form.io';

// The Form.IO base API.
var formioBaseUrl = 'https://api.form.io';

/**
 * @ngdoc overview
 * @name movieappApp
 * @description
 * # movieappApp
 *
 * Main module of the application.
 */
angular
  .module('movieappApp', [
    'ngAnimate',
    'ngSanitize',
    'ui.select',
    'ui.router',
    'angularMoment',
    'formio',
    'ngMap'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    'FormioProvider',
    function ($stateProvider, $urlRouterProvider, FormioProvider) {
      FormioProvider.setBaseUrl(formioBaseUrl);
      $stateProvider
        .state('home', {
          url: '/?',
          templateUrl: 'views/main.html'
        })
        .state('auth', {
          abstract: true,
          url: '/auth',
          templateUrl: 'views/user/auth.html'
        })
        .state('auth.login', {
          url: '/login',
          parent: 'auth',
          templateUrl: 'views/user/login.html',
          controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
            $scope.$on('formSubmission', function(err, submission) {
              if (!submission) { return; }
              $rootScope.user = submission;
              $state.go('home');
            });
          }]
        })
        .state('auth.register', {
          url: '/register',
          parent: 'auth',
          templateUrl: 'views/user/register.html',
          controller: ['$scope', '$state', '$rootScope', function($scope, $state, $rootScope) {
            $scope.$on('formSubmission', function(err, submission) {
              if (!submission) { return; }
              $rootScope.user = submission;
              $state.go('home');
            });
          }]
        })
        .state('movieIndex', {
          url: '/movie',
          templateUrl: 'views/movie/index.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('submissionView', function(event, submission) {
              $state.go('movie.view', {
                movieId: submission._id
              });
            });

            $scope.$on('submissionEdit', function(event, submission) {
              $state.go('movie.edit', {
                movieId: submission._id
              });
            });

            $scope.$on('submissionDelete', function(event, submission) {
              $state.go('movie.delete', {
                movieId: submission._id
              });
            });
          }]
        })
        .state('createMovie', {
          url: '/create/movie',
          templateUrl: 'views/movie/create.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('formSubmission', function(event, submission) {
              $state.go('movie.view', {movieId: submission._id});
            });
          }]
        })
        .state('movie', {
          abstract: true,
          url: '/movie/:movieId',
          templateUrl: 'views/movie/movie.html',
          controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
            $scope.movieUrl = $scope.movieForm + '/submission/' + $stateParams.movieId;
          }]
        })
        .state('movie.view', {
          url: '/',
          parent: 'movie',
          templateUrl: 'views/movie/view.html',
          controller: ['$scope', '$stateParams', 'Formio', function ($scope, $stateParams, Formio) {
            var loader = new Formio($scope.movieForm + '/submission/' + $stateParams.movieId);
            $scope.movie = {};
            loader.loadSubmission().then(function(submission) {
              $scope.movie = submission;
            });
          }]
        })
        .state('movie.edit', {
          url: '/edit',
          parent: 'movie',
          templateUrl: 'views/movie/edit.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('formSubmission', function(event, submission) {
              $state.go('movie.view', {movieId: submission._id});
            });
          }]
        })
        .state('movie.delete', {
          url: '/delete',
          parent: 'movie',
          templateUrl: 'views/movie/delete.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('delete', function() {
              $state.go('movieIndex');
            });
          }]
        })
        .state('directorIndex', {
          url: '/director',
          templateUrl: 'views/director/index.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('submissionView', function(event, submission) {
              $state.go('director.view', {
                directorId: submission._id
              });
            });

            $scope.$on('submissionEdit', function(event, submission) {
              $state.go('director.edit', {
                directorId: submission._id
              });
            });

            $scope.$on('submissionDelete', function(event, submission) {
              $state.go('director.delete', {
                directorId: submission._id
              });
            });
          }]
        })
        .state('createDirector', {
          url: '/create/director',
          templateUrl: 'views/director/create.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('formSubmission', function(event, submission) {
              $state.go('director.view', {directorId: submission._id});
            });
          }]
        })
        .state('director', {
          abstract: true,
          url: '/director/:directorId',
          templateUrl: 'views/director/director.html',
          controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
            $scope.directorUrl = $scope.directorForm + '/submission/' + $stateParams.directorId;
          }]
        })
        .state('director.view', {
          url: '/',
          parent: 'director',
          templateUrl: 'views/director/view.html',
          controller: ['$scope', '$stateParams', 'Formio', function ($scope, $stateParams, Formio) {
            var loader = new Formio($scope.directorForm + '/submission/' + $stateParams.directorId);
            $scope.director = {};
            $scope.position = {lat: '40.74', lng: '-74.18'};
            loader.loadSubmission().then(function(submission) {
              $scope.position.lat = submission.data.address.geometry.location.lat;
              $scope.position.lng = submission.data.address.geometry.location.lng;
              $scope.director = submission;
            });
          }]
        })
        .state('director.edit', {
          url: '/edit',
          parent: 'director',
          templateUrl: 'views/director/edit.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('formSubmission', function(event, submission) {
              $state.go('director.view', {directorId: submission._id});
            });
          }]
        })
        .state('director.delete', {
          url: '/delete',
          parent: 'director',
          templateUrl: 'views/director/delete.html',
          controller: ['$scope', '$state', function ($scope, $state) {
            $scope.$on('delete', function() {
              $state.go('directorIndex');
            });
          }]
        });

        $urlRouterProvider.otherwise('/');
    }
  ])
  .run([
    '$state',
    '$rootScope',
    'Formio',
    function(
      $state,
      $rootScope,
      Formio
    ) {
      $rootScope.userLoginForm = movieAppAPI + '/user/login';
      $rootScope.userRegisterForm = movieAppAPI + '/user/register';
      $rootScope.movieForm = movieAppAPI + '/movie';
      $rootScope.directorForm = movieAppAPI + '/director';

      // Set the current user if it isn't provided.
      if (!$rootScope.user) {
        Formio.currentUser().then(function(user) {
          $rootScope.user = user;
        });
      }

      // Ensure they are logged in.
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        $rootScope.authenticated = !!Formio.getToken();
        if (toState.name.substr(0, 4) === 'auth') { return; }
        if(!$rootScope.authenticated) {
          event.preventDefault();
          $state.go('auth.login');
        }
      });

      var authError = function() {
        $state.go('home');
      };

      var logoutError = function() {
        $state.go('auth.login');
      };

      $rootScope.$on('formio.sessionExpired', logoutError);
      $rootScope.$on('formio.unauthorized', authError);

      // Logout of form.io and go to login page.
      $rootScope.logout = function() {
        Formio.logout().then(function() {
          $state.go('auth.login');
        }).catch(logoutError);
      };

      // Determine if a state is active.
      $rootScope.isActive = function(state) {
        return $state.current.name.indexOf(state) !== -1;
      };
    }
  ])
  .directive('youtube', function() {
    return {
      restrict: 'E',
      scope: {
        src: '='
      },
      templateUrl: 'views/youtube.html'
    };
  })
  .filter('trusted', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
