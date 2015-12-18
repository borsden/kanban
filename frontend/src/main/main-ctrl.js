angular.module('Kanban')
    .controller('MainCtrl', ['$scope', '$dragon', 'dateFormatter', 'CurrentUser', '$mdDialog', '$mdMedia', MainCtrl]);
function MainCtrl($scope, $dragon, dateFormatter, CurrentUser, $mdDialog, $mdMedia) {
    var vm = this;
    vm.user = {id: 1};

    CurrentUser.get({}, {}).$promise.then(function (data) {
        vm.user = data;
        $dragon.onReady(function () {
            $dragon.getList('board', {}).then(function (response) {
                vm.boards = response.data;
            });
            $dragon.subscribe('board', 'board_channel', {}).then(function (response) {
                vm.dataMapper = new DataMapper(response.data);
            });
            $dragon.getList('user', {}).then(function (response) {
                vm.colleagues = response.data;
            });
            $dragon.subscribe('user', 'colleagues_channel', {}).then(function (response) {
                vm.dataMapper = new DataMapper(response.data);
            });
        });

    });


    $dragon.onChannelMessage(function (channels, message) {
        if (indexOf.call(channels, 'board_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.boards, message);
            });
        }
        if (indexOf.call(channels, 'colleagues_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.colleagues, message);
            });
        }
    });


    vm.dateFormatter = function (JSONTime) {
        return dateFormatter(JSONTime);
    };


    vm.newChangeBoard = function (ev, board) {
        $mdDialog.show({
            controller: 'BoardSettingsDialogCtrl',
            controllerAs: 'board_settings_dialog_ctrl',
            templateUrl: 'board-settings-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            fullscreen: $mdMedia('sm') && vm.customFullscreen,
            locals: {
                board: board
            }
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
}