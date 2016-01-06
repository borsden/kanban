//Фабрика для форматирования JSON-даты в нормальную дату
angular.module('Kanban')
    .factory('dateFormatter', function () {
        return function (JSONTime) {
            var timestamp = Date.parse(JSONTime);

            if (isNaN(timestamp) == false) {
                return new Date(timestamp);

            }
            else {
                return null;
            }


        }
    });
