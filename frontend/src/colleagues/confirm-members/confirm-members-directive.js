angular
    .module('Kanban')
    .directive('confirmMembers', [confirmMembers]);

function confirmMembers() {
    var directive = {
        templateUrl: 'confirm-members.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}