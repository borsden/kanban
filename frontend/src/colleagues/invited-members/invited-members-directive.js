angular
    .module('Kanban')
    .directive('invitedMembers', [invitedMembers]);

function invitedMembers() {
    var directive = {
        templateUrl: 'invited-members.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}