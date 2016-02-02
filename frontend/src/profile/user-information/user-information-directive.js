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
            var input = angular.element(elem[0].querySelector('#avatarInput'));

            scope.clicked = function (e) {
                setTimeout(function () {
                    input[0].click()
                }, 0)
            };
            //if (input.length && button.length) {
            //    button.click((e) => input.click())
            //}
        }
    };
    return directive;

}