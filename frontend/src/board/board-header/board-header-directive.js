angular
    .module('Kanban')
    .directive('boardHeader', [boardHeader]);

function boardHeader() {
    var directive = {
        templateUrl: 'board-header.html',
        restrict: 'EA',
        controller: 'BoardHeaderCtrl',
        controllerAs: 'board_header_ctrl',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}