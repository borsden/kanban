angular
    .module('Kanban')
    .directive('settingsEmail', [settingsEmail]);

function settingsEmail() {
    var directive = {
        templateUrl: 'settings-email.html',
        restrict: 'EA',
        controller: 'settingsEmailCtrl',
        controllerAs: 'settings_email_ctrl',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}