angular.module('formioAppMovie')
  .filter('trusted', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  })
  .provider('MovieResource', function() {
    return {
      $get: function() { return null; },
      parent: 'playlist',
      base: 'playlist.',
      templates: {
        index: 'app/resources/movie/index.html',
        abstract: 'app/resources/movie/resource.html',
        view: 'app/resources/movie/view.html'
      },
      controllers: {
        index: [
          '$scope',
          '$stateParams',
          'AppConfig',
          function(
            $scope,
            $stateParams,
            AppConfig
          ) {
            $scope.movies = [];
            $scope.moviesUrl = AppConfig.resources.movie.form + '/submission';
            $scope.perPagePresets = [16];
            $scope.moviesPerPage = 16;
            $scope.moviesQuery = {
              'data.playlist._id': $stateParams.playlistId
            };
          }
        ],
        view: ['$scope', function($scope) {
          $scope.youtube = '';
          $scope.movie.loadSubmissionPromise.then(function(movie) {
            $scope.youtube = 'https://www.youtube.com/embed/' + movie.data.youtubeId;
          });
        }],
        create: [
          '$scope',
          function(
            $scope
          ) {
            $scope.$on('formSubmission', function(err, submission) {
              // Save the latest movie back to the playlist parent.
              $scope.playlist.resource.data.latestMovie = submission.data.youtubeId;
              $scope.playlist.formio.saveSubmission($scope.playlist.resource);
            });
          }
        ]
      }
    };
  });
