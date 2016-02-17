//Сервисы для досок
angular.module('Kanban')
    .factory('CreateBoard', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'create_board/ ', {}, {
                create: {
                    method: 'POST'
                }
            });
        }])
    .factory('Boards', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'boards/:id/ ', {id: "@id"}, {
                get: {method: 'GET'},
                delete: {
                    method: 'DELETE'
                },
                update: {
                    method: 'PUT'
                }
            });
        }])
    .factory('DeleteBoardMember', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'delete_board_member/:id/ ', {id: "@id"}, {
                delete: {method: 'PUT'}
            });
        }]);