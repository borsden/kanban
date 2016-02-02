angular
    .module('Kanban')
    .directive('requestMembers', [requestMembers]);

function requestMembers() {
    var directive = {
        templateUrl: 'request-members.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}