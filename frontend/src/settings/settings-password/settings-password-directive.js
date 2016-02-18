angular
    .module('Kanban')
    .directive('settingsPassword', [settingsPassword]);

function settingsPassword() {
    var directive = {
        templateUrl: 'settings-password.html',
        restrict: 'EA',
        controller: 'SettingsPasswordCtrl',
        controllerAs: 'settings_password_ctrl',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}
angular
    .module('Kanban')
    .directive('compareTo', [compareTo]);

function compareTo() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};