angular.module('formioAppMovie')
  .provider('PlaylistResource', function() {
    return {
      $get: function() { return null; },
      templates: {
        index: 'app/resources/playlist/index.html',
        abstract: 'app/resources/playlist/resource.html'
      },
      controllers: {
        index: [
          '$scope',
          'Formio',
          'AppConfig',
          function(
            $scope,
            Formio,
            AppConfig
          ) {
            $scope.playlists = [];
            $scope.playlistUrl = AppConfig.resources.playlist.form + '/submission';
          }
        ],
        create: ['$scope', function($scope) {
          $scope.hideComponents = ['latestMovie'];
        }]
      }
    };
  });
