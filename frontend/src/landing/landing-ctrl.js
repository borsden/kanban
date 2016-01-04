angular.module('Kanban')
    .controller('LandingCtrl', ['$scope', 'CurrentUser', '$mdDialog', '$mdMedia', LandingCtrl]);
function LandingCtrl($scope, CurrentUser, $mdDialog, $mdMedia) {
    var vm = this;
    vm.loginAuth = function (type) {
        $mdDialog.show({
            controller: 'LoginAuthDialogCtrl',
            controllerAs: 'login_auth_dialog_ctrl',
            templateUrl: 'login-auth-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            locals: {
                dialog_type: type
            },
            fullscreen: $mdMedia('sm') && vm.customFullscreen
        })
            .then(function (answer) {

            }, function () {
            });
        $scope.$watch(function () {
            return $mdMedia('sm');
        }, function (sm) {
            vm.customFullscreen = (sm === true);
        });
    };
}