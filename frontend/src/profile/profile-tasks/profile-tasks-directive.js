angular
    .module('Kanban')
    .directive('profileTasks', [profileTasks]);

function profileTasks() {
    var directive = {
        templateUrl: 'profile-tasks.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}