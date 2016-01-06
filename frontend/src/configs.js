// Конфиг для календаря и для csrf.
angular.module('Kanban')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }])
    .config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        $mdDateLocaleProvider.firstDayOfWeek = 1;
    }]);