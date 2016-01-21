angular.module('Kanban')
    .controller('ColumnSortCtrl', ['$element', '$scope', 'dragularService', ColumnSortCtrl]);
function ColumnSortCtrl($element, $scope, dragularService) {
    // Контроллер для реализации drag'n'drop
    dragularService($element.children()[0], {
        //Упорядоченный список колонок
        containersModel: [$scope.board_settings_dialog_ctrl.columns],
        scope: $scope,
        //Перетаскиваем только по оси y
        lockY: true
        /*        //Перемещаем только иконкой
         moves: function (el, container, handle) {
         return angular.element(handle).hasClass('handle')
         }*/
    });

}
