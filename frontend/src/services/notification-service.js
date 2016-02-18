//Сервис для пользователей
angular.module('Kanban')
    .factory('EmailNotification', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'change_email_notification/:id/ ', {id: "@id"}, {
                update: {
                    method: 'PUT'
                }
            });
        }]);