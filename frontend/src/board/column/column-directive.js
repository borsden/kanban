angular
    .module('Kanban')
    .directive('column', [column]);

function column() {
    var directive = {
        templateUrl: 'column.html',
        controller: 'ColumnCtrl',
        controllerAs: 'column_ctrl',
        //scope: true,
        //scope: {category: '='},
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.column = scope.column;
            ctrl.changing_column = angular.copy(ctrl.column);
            elem.addClass("board-column")
        }
    };
    return directive;

}