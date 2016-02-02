//Сервис коллег
angular.module('Kanban')
    .factory('Colleagues', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'colleagues/:board_id ', {}, {
                get: {method: 'GET', isArray: true}
            });
        }]);