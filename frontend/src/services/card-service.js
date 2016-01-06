//Сервисы для карточек
angular.module('Kanban')
    .factory('CreateCard', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'create_card/ ', {}, {
                create: {
                    method: 'POST'
                }
            });
        }])
    // Сервис для архивирования карточки
    .factory('ArchiveCard', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'archive_card/:id/ ', {id: "@id"}, {
                archive: {
                    method: 'PUT'
                }
            });
        }])
    // Сервис для изменения колонки карточки
    .factory('ChangeColumnCard', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'change_column_card/:column_id/:card_id/ ',
                {
                    column_id: "@column_id",
                    card_id: "@card_id"
                },
                {
                    update: {method: 'PUT'}
                });
        }])
    .factory('Cards', ['$resource', 'Constants', function ($resource, Constants) {
        return $resource(Constants.apiUrl + 'cards/:id/ ', {id: "@id"}, {
            get: {method: 'GET'},
            delete: {method: 'DELETE'},
            update: {method: 'PUT'}
        });
    }]);