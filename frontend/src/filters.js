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
    })
    .filter('boardMembers', function () {
        return function (items, board_members_id) {
            var tmp = {};
            var item, index;
            for (var i in items) {
                item = items[i];
                index = board_members_id.indexOf(item.id);
                if (index >= 0) {
                    tmp[i] = item;
                }
            }
            return tmp;
        }
    });
