angular
    .module('Kanban')
    .directive('followers', [followers]);

function followers() {
    var directive = {
        templateUrl: 'followers.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}