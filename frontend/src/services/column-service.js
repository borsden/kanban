angular.module('Kanban')
    .factory('CreateColumn', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'create_column/ ', {}, {
                create: {
                    method: 'POST'
                }
            });
        }])
        .factory('Columns', ['$resource','Constants', function ($resource, Constants) {
        return $resource(Constants.apiUrl + 'columns/:id/ ', {id: "@id"}, {
                get: {method: 'GET'},
                delete: {
                    method: 'DELETE'
                },
                update: {
                    method: 'PUT'
                }
            });

}]);