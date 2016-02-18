angular.module('Kanban')
    .controller('SettingsPasswordCtrl', ['ChangePassword', '$scope', SettingsPasswordCtrl]);
function SettingsPasswordCtrl(ChangePassword, $scope) {
    var vm = this;
    vm.passwords = {old_password: '', new_password: '', confirm_password: ''};
    vm.startChangingPassword = function () {
        return (vm.passwords.old_password || vm.passwords.new_password || vm.passwords.confirm_password)
    }
    vm.savePassword = function () {
        ChangePassword.post(vm.passwords, function (data) {
            $scope.settings_password_form.$setUntouched()
            vm.passwords = {old_password: '', new_password: '', confirm_password: ''};
        }, function (errors) {
            console.log(errors)
        })
    }
}