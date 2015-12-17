angular
    .module('Kanban')
    .directive('columnHeader', [columnHeader]);

function columnHeader() {
    var directive = {
        templateUrl: 'column-header.html',
        controller: 'ColumnHeaderCtrl',
        controllerAs: 'column_header_ctrl',
        //scope: true,
        //scope: {category: '='},
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.column = scope.column;
            ctrl.changing_column = angular.copy(ctrl.column);
            //elem.addClass("board-column")
        }
    };
    return directive;

}