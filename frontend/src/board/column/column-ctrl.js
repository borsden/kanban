angular.module('Kanban')
    .controller('ColumnCtrl', ['$scope', '$mdDialog', '$mdMedia', 'CreateCard', ColumnCtrl]);
function ColumnCtrl($scope, $mdDialog, $mdMedia, CreateCard) {
    var vm = this;

    vm.isCurrentCategory = function (card) {
        //console.log(card);
        return card.column == vm.column.id
    };

    vm.showSettings = function (ev) {
        $mdDialog.show({
            controller: 'BoardSettingsDialogCtrl',
            controllerAs: 'board_settings_dialog_ctrl',
            templateUrl: 'board-settings-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $mdMedia('sm') && vm.customFullscreen
        })
            .then(function (answer) {
                vm.status = 'You said the information was "' + answer + '".';
            }, function () {
                vm.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function () {
            return $mdMedia('sm');
        }, function (sm) {
            vm.customFullscreen = (sm === true);
        });
    };

    vm.add = false;

    vm.addCard = function () {
        vm.adding_card = {title: "Новая задача", column: vm.column.id};
        vm.add = true;
    };

    vm.addCardCancel = function () {
        vm.adding_card = {};
        vm.add = false;
    };
    vm.addCardConfirm = function () {
        //console.log(vm.adding_card);
        CreateCard.create(vm.adding_card, function (data) {
            },
            function () {
                //$scope.showAlertError('При добавлении счета');
                //$scope.cancel()
            });
        vm.adding_card = {};
        vm.add = false;
    };
}
