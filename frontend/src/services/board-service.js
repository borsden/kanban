//angular.module('Kanban')
//    .factory('CreateBoard', ['$resource', 'Constants',
//        function ($resource, Constants) {
//            return $resource(Constants.apiUrl + 'create_category/ ', {}, {
//                create: {
//                    method: 'POST'
//                }
//            });
//        }])
//    .factory('Boards', ['$resource', 'Constants',
//        function ($resource, Constants) {
//            return $resource(Constants.apiUrl + 'boards/:id/ ', {id: "@id"}, {
//                get: {method: 'GET'},
//                delete: {
//                    method: 'DELETE'
//                },
//                update: {
//                    method: 'PUT'
//                }
//            });
//        }]);