angular
    .module('Kanban')
    .directive('userInformation', [userInformation]);

function userInformation() {
    var directive = {
        templateUrl: 'user-information.html',
        restrict: 'EA',
        controller: 'UserInformationCtrl',
        controllerAs: 'user_information_ctrl',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}