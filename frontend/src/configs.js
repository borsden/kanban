angular
    .module('Kanban')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }])
    .config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {

        $mdDateLocaleProvider.shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        // Can change week display to start on Monday.
        $mdDateLocaleProvider.firstDayOfWeek = 1;

        // Example uses moment.js to parse and format dates.
        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('L');
        };
        //$mdDateLocaleProvider.monthHeaderFormatter = function (date) {
        //    return myShortMonths[date.getMonth()] + ' ' + date.getFullYear();
        //};

        //$mdDateLocaleProvider.msgCalendar = 'Calendrier';
        //$mdDateLocaleProvider.msgOpenCalendar = 'Ouvrir le calendrier';
    }]);