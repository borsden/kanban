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
        }])
    .factory('LoginUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'login/ ', {}, {
                post: {
                    method: 'POST'
                }
            });
        }])
    .factory('LogoutUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'logout/ ', {}, {
                get: {
                    method: 'GET'
                }
            });
        }]);