//Сервис коллег
angular.module('Kanban')
    .factory('InvitedMember', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'invited_member/ ', {}, {
                post: {method: 'POST'}
            });
        }])
    .factory('DeleteInvitedMember', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'delete_invited_member/:id/ ', {id: "@id"}, {
                delete: {method: 'DELETE'}
            });
        }])
    .factory('Follower', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'follower/:id/ ', {id: "@id"}, {
                update: {method: 'PUT'}
            });
        }])
    .factory('DeleteFollower', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'delete_follower/:id/ ', {id: "@id"}, {
                delete: {method: 'PUT'}
            });
        }]);