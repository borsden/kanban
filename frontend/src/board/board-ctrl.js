angular.module('Kanban')
    .controller('BoardCtrl', ['$scope', '$dragon', '$stateParams', BoardCtrl]);
function BoardCtrl($scope, $dragon, $stateParams) {
    //Получаем id текущей доски
    var board_id = $stateParams.id;
    var vm = this;
    // Перменные для ожидания ответа с колонками и карточками от сервера
    vm.dict_done = {columns_done: false, cards_done: false};
    vm.all_done = false;
    // Если ответ получен, отображаем колонки
    $scope.$watch('board_ctrl.dict_done', function (value) {
        var all_done = true;
        for (var i in value) {
            if (!value[i]) {
                all_done = false;
                break;
            }
        }
        if (all_done) {
            vm.all_done = all_done
        }

    }, true);

    $dragon.onReady(function () {
        $dragon.getSingle('board', {id: board_id}).then(function (response) {
            // Получаем текущую доску
            vm.current_board = response.data;
            // Получаем колонки данной доски
            $dragon.getList('column', {board__id: vm.current_board.id}).then(function (response) {

                vm.columns = response.data;
                vm.dict_done.columns_done = true;
            });
            $dragon.subscribe('column', 'column_channel', {board__id: vm.current_board.id}).then(function (response) {
                vm.dataMapper = new DataMapper(response.data);
            });
            // Получаем карточки данной доски
            $dragon.getList('card', {column__board__id: vm.current_board.id}).then(function (response) {
                vm.cards = response.data;
                vm.dict_done.cards_done = true;
            });
            $dragon.subscribe('card', 'card_channel', {column__board__id: vm.current_board.id}).then(function (response) {
                vm.dataMapper = new DataMapper(response.data);

            });

        }, function (error) {
            vm.get_board_error = true;
        });
        $dragon.subscribe('board', 'current_board_channel', {id: board_id}).then(function (response) {
            vm.dataMapper = new DataMapper(response.data);
        });
    });

    if (!vm.get_board_error) {
        $dragon.onChannelMessage(function (channels, message) {
        if (indexOf.call(channels, 'current_board_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.current_board, message);
            });
        }
        if (indexOf.call(channels, 'card_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.cards, message);
            });
        }
        if (indexOf.call(channels, 'column_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.columns, message);
            });
        }
    });
    }


}