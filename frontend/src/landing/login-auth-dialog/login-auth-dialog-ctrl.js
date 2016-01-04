angular.module('Kanban')
    .controller('LoginAuthDialogCtrl', ['$mdDialog', 'LoginUser', '$scope', 'dialog_type', '$window', LoginAuthDialogCtrl]);
function LoginAuthDialogCtrl($mdDialog, LoginUser, $scope, dialog_type, $window) {
    //$scope
    var vm = this;
    //vm.login_user = {email:'', p}

    if (dialog_type == 'login') {
        vm.selected_tab = 0
    }
    else if (dialog_type == 'reg') {
        vm.selected_tab = 1
    }


    vm.hide = function () {
        $mdDialog.hide();
    };

    vm.loginUser = function () {
        LoginUser.post(vm.login_user, function (data) {
            //$scope.main_ctrl.user = data;
            $window.location.reload();
        })
    }


}