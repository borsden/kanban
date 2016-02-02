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
            //Находим file input для аватара
            var input = angular.element(elem[0].querySelector('#avatarInput'));
            //При нажатии на кнопку изменения аватара, вызывается нажатие avatarInput'а
            scope.clicked = function (e) {
                setTimeout(function () {
                    input[0].click()
                }, 0)
            };
        }
    };
    return directive;

}