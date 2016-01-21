angular
    .module('Kanban')
    .directive('boardSettingsColumns', [boardSettingsColumns]);

function boardSettingsColumns() {
    var directive = {
        templateUrl: 'board-settings-columns.html',
        restrict: 'EA',
        // Контроллер для редактирования колонок, а также для изменения их порядка.
        controller: 'BoardSettingsColumnsCtrl',
        controllerAs: 'board_settings_columns_ctrl',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.columns = scope.board_settings_dialog_ctrl.columns;
            ctrl.previous_columns = angular.copy(ctrl.columns);

        }
    };
    return directive;

}