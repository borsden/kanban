angular.module('Kanban')
    .controller('BoardCtrl', ['$scope', '$dragon', '$stateParams', 'Columns', BoardCtrl]);
function BoardCtrl($scope, $dragon, $stateParams, Columns) {
    var board_id = $stateParams.id;
    var vm = this;

    vm.getCard = function (card_id, cards) {
        //vm.card = getObj(card_id, cards)
        for (var i = 0; i < cards.length; i++) {
            if (cards[i]['id'] == card_id) {
                vm.card = cards[i];
            }
        }
    };

    vm.onSortEnd = function () {
        for (var i = 0; i < vm.columns.length; i++) {
            Columns.update(vm.columns[i], function (data) {
            });
        }
    };

    $dragon.onReady(function () {

        $dragon.getSingle('board', {id: board_id}).then(function (response) {
            vm.current_board = response.data;
            $dragon.getList('column', {board__id: vm.current_board.id}).then(function (response) {
                vm.columns = response.data
            });
            $dragon.subscribe('column', 'column_channel', {board__id: vm.current_board.id}).then(function (response) {
                vm.dataMapper = new DataMapper(response.data);
            });
            $dragon.getList('card', {column__board__id: vm.current_board.id}).then(function (response) {
                vm.cards = response.data
            });
            $dragon.subscribe('card', 'card_channel', {column__board__id: vm.current_board.id}).then(function (response) {
                vm.dataMapper = new DataMapper(response.data);
            });

        });
        $dragon.subscribe('board', 'current_board_channel', {id: 1}).then(function (response) {
            vm.dataMapper = new DataMapper(response.data);
        });
    });


    $dragon.onChannelMessage(function (channels, message) {

        if (indexOf.call(channels, 'current_board_channel') > -1) {
            $scope.$apply(function () {

                console.log(message);
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