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
        console.log(vm.login_user)
        LoginUser.post(vm.login_user, function (data) {
            console.log(data);
            $window.location.reload();
        }, function (error) {
            console.log('error', error)
        })
    }


}