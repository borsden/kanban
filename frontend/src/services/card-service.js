angular.module('Kanban')
    .factory('CreateCard', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'create_card/ ', {}, {
                create: {
                    method: 'POST'
                }
            });
        }])
    .factory('Cards', ['$resource','Constants', function ($resource, Constants) {
        return $resource(Constants.apiUrl + 'cards/:id/ ', {id: "@id"}, {
                get: {method: 'GET'},
                delete: {
                    method: 'DELETE'
                },
                update: {
                    method: 'PUT'
                }
            });

}]);