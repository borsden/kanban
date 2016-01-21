//Сервис для колонок
angular.module('Kanban')
    .factory('CreateColumn', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'create_column/ ', {}, {
                create: {
                    method: 'POST'
                }
            });
        }])

    .factory('Columns', ['$resource', 'Constants', function ($resource, Constants) {
        return $resource(Constants.apiUrl + 'columns/:id/ ', {id: "@id"}, {
            get: {method: 'GET'},
            delete: {
                method: 'DELETE'
            },
            update: {
                method: 'PUT'
            }
        });
    }])
    // Сервис для изменения колонок(порядок и т.д.) при редактировании доски
    .factory('ChangeBoardColumns', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'change_board_columns/ ', {}, {
                post: {
                    method: 'POST'
                }
            });
        }]);