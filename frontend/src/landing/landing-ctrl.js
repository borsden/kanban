angular.module('Kanban')
    .controller('LandingCtrl', ['$scope', '$mdDialog', LandingCtrl]);
function LandingCtrl($scope, $mdDialog) {
    var vm = this;
    // Модальное окно для входа/регистрации
    vm.loginAuth = function (type) {
        $mdDialog.show({
            controller: 'LoginAuthDialogCtrl',
            controllerAs: 'login_auth_dialog_ctrl',
            templateUrl: 'login-auth-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,        // Наследуем scope.
            preserveScope: true,
            // Выбираем тип окна: регистрация или вход (модальное окно с возможностью переключения с регистрации на вход)
            locals: {
                dialog_type: type
            }
        })
    };
}