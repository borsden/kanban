angular.module('Kanban')
    .factory('CreateCard', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'create_card/ ', {}, {
                create: {
                    method: 'POST'
                }
            });
        }])
    .factory('ArchiveCard', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'archive_card/:id/ ', {id: "@id"}, {
                archive: {
                    method: 'PUT'
                }
            });
        }])
    .factory('Cards', ['$resource', 'Constants', function ($resource, Constants) {
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