angular.module('Kanban')
    .directive('main', [main]);

function main() {
    var directive = {
        templateUrl: 'main.html',
        controller: 'MainCtrl',
        controllerAs: 'main_ctrl',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}