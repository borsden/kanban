angular
    .module('Kanban')
    .directive('boardSettingsMembers', [boardSettingsMembers]);

function boardSettingsMembers() {
    var directive = {
        templateUrl: 'board-settings-members.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}