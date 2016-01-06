//Фильтр для карточек, которые не в архиве и которые принадлежат данной колонке
angular.module('Kanban')
    .filter('currentCard', function () {
        return function (items, column_id) {
            var tmp = {};
            for (var i in items) {
                var item = items[i];
                if (item.column_id == column_id && item.archive == false) {
                    tmp[i] = item;
                }
            }
            return tmp;
        }
    });
