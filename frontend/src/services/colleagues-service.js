//Сервис коллег
angular.module('Kanban')
    .factory('Colleagues', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'colleagues/ ', {}, {
                get: {method: 'GET', isArray: true}
            });
        }])
    .factory('InvitedMembers', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'invited_members/ ', {}, {
                get: {method: 'GET', isArray: true},
                post: {method: 'POST'}
            });
        }])
    .factory('DeleteInvitedMember', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'delete_invited_member/:id/ ', {id: "@id"}, {
                delete: {method: 'DELETE'}
            });
        }])
    .factory('AllFollowers', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'all_followers/ ', {}, {
                get: {method: 'GET', isArray: true}
            });
        }])
    .factory('Follower', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'follower/:id/ ', {id: "@id"}, {
                update: {method: 'PUT', isArray: true}
            });
        }])
    .factory('DeleteFollower', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'delete_follower/:id/ ', {id: "@id"}, {
                delete: {method: 'PUT'}
            });
        }]);