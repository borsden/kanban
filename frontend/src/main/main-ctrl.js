angular.module('Kanban')
    .controller('MainCtrl', ['$scope', '$dragon', 'dateFormatter', 'CurrentUser',
        '$mdDialog', '$mdMedia', 'LogoutUser', '$window', MainCtrl]);
function MainCtrl($scope, $dragon, dateFormatter, CurrentUser, $mdDialog, $mdMedia, LogoutUser, $window) {
    var vm = this;
    // Получаем авторизованного пользователя
    CurrentUser.get({}, {}).$promise.then(function (data) {

        vm.user = data;
        // В случае, если пользователь авторизован, получаем список его досок и список коллег.
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

    }, function (data) {
        // Если пользователь не авторизован, будет выполнятся код в данной функции.
    });

    // Ловим изменения в списке коллег или досок.
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

    // Функция форматирования даты
    vm.dateFormatter = function (JSONTime) {
        return dateFormatter(JSONTime);
    };

    // Модульное окно создания или изменения доски.
    vm.newChangeBoard = function (ev, board) {
        $mdDialog.show({
            controller: 'BoardSettingsDialogCtrl',
            controllerAs: 'board_settings_dialog_ctrl',
            templateUrl: 'board-settings-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope, // Наследуем $scope
            preserveScope: true,
            //fullscreen: $mdMedia('xs'), //Размер на весь экран
            //В случае изменения доски, отправляем ее в качестве переменной.
            locals: {
                board: board
            }
        });
    };

    // Выход пользователя
    vm.exit = function () {
        LogoutUser.get({}, {}).$promise.then(function (data) {
            $window.location.reload();
        });
    }
}