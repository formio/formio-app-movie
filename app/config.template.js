angular.module('movieappApp').constant('AppConfig', {
{% if domain %}
  appUrl: '{{ domain }}',
  apiUrl: '{{ domain }}'
{% else %}
  appUrl: '{{ protocol }}://{{ path }}.{{ host }}',
  apiUrl: '{{ protocol }}://api.{{ host }}'
{% endif %}
});
