angular.module('Kanban')
    .controller('CardSortCtrl', ['$element', '$scope', 'dragularService', 'ChangeColumnCard', CardSortCtrl]);
function CardSortCtrl($element, $scope, dragularService, ChangeColumnCard) {
    // Контроллер для реализации drag'n'drop
    dragularService($element, {
        scope: $scope
    });
    // В случае, если перенос карточки закончен, на сервер отправляется уведомление об изменении колонки карточки.
    $scope.$on('dragulardragend', dragEnd());

    function dragEnd() {
        return function () {

            var card_id = arguments[1].id;
            var column_id = arguments[1].parentElement.id;
            ChangeColumnCard.update({}, {card_id: card_id, column_id: column_id}, function (data) {
            })
        };
    }
}
