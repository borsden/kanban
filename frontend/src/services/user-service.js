//Сервис для пользователей
angular.module('Kanban')
    .factory('CurrentUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'current_user/ ', {id: "@id"}, {
                get: {method: 'GET'},
                delete: {
                    method: 'DELETE'
                },
                update: {
                    method: 'PUT'
                }
            });
        }])
    //Сервис для входа пользователя
    .factory('LoginUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'login/ ', {}, {
                post: {
                    method: 'POST'
                }
            });
        }])
    //Сервис для выхода
    .factory('LogoutUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'logout/ ', {}, {
                get: {
                    method: 'GET'
                }
            });
        }]);