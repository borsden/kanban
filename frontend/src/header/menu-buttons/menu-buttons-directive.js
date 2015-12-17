angular
    .module('Kanban')
    .directive('menuButtons', [menuButtons]);

function menuButtons() {
    var directive = {
        templateUrl: 'menu-buttons.html',
        restrict: 'A',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}