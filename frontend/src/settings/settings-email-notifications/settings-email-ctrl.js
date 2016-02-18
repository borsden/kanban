angular.module('Kanban')
    .controller('settingsEmailCtrl', ['EmailNotification', '$scope', settingsEmailCtrl]);
function settingsEmailCtrl(EmailNotification, $scope) {
    var vm = this;
    vm.email_notification = angular.copy($scope.main_ctrl.user.email_notification);
    vm.changingEmailNotification = function () {
        return !angular.equals(vm.email_notification, $scope.main_ctrl.user.email_notification)
    }
    vm.saveEmailNotification = function () {
        EmailNotification.update(vm.email_notification, function (data) {
            $scope.main_ctrl.user.email_notification = data;
            vm.email_notification = angular.copy($scope.main_ctrl.user.email_notification);
        }, function (error) {
            console.log(error)
        })
    }
}