angular
    .module('Kanban')
    .directive('profileBoards', [profileBoards]);

function profileBoards() {
    var directive = {
        templateUrl: 'profile-boards.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}