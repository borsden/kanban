angular
    .module('Kanban')
    .directive('headerMenu', [headerMenu]);

function headerMenu() {
    var directive = {
        templateUrl: 'header.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}