angular.module('Kanban')
    .controller('LoginAuthDialogCtrl', ['$mdDialog', 'LoginUser', '$scope', 'dialog_type', '$window', LoginAuthDialogCtrl]);
function LoginAuthDialogCtrl($mdDialog, LoginUser, $scope, dialog_type, $window) {

    var vm = this;
    // Выбор откртыого окна
    if (dialog_type == 'login') {
        vm.selected_tab = 0
    }
    else if (dialog_type == 'reg') {
        vm.selected_tab = 1
    }


    vm.hide = function () {
        $mdDialog.hide();
    };
    // Вход пользователя
    vm.loginUser = function () {
        LoginUser.post(vm.login_user, function (data) {
            $window.location.reload();
        })
    }


}