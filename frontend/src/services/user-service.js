angular.module('Kanban')
    //.factory('CreateBoard', ['$resource', 'Constants',
    //    function ($resource, Constants) {
    //        return $resource(Constants.apiUrl + 'create_category/ ', {}, {
    //            create: {
    //                method: 'POST'
    //            }
    //        });
    //    }])
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
        }]);