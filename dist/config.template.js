angular.module('movieappApp').constant('AppConfig', {
  appUrl: '{{ protocol }}://{{ path }}.{{ host }}',
  apiUrl: '{{ protocol }}://api.{{ host }}'
});
