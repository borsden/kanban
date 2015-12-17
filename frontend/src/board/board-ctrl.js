angular.module('Kanban')
    .controller('BoardCtrl', ['$scope', '$dragon', BoardCtrl]);
function BoardCtrl($scope, $dragon) {
    var vm = this;

    $dragon.onReady(function () {

        $dragon.getSingle('current_board', {id: 1}).then(function (response) {
            vm.current_board = response.data;
            console.log(vm.current_board);
            /*$dragon.getList('board', {members__id: 1}).then(function (response) {
             vm.boards = response.data;
             });
             $dragon.subscribe('board', 'board_channel', {members__id: 1}).then(function (response) {
             vm.dataMapper = new DataMapper(response.data);
             });*/
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
        $dragon.subscribe('current_board', 'current_board_channel', {id: 1}).then(function (response) {
            vm.dataMapper = new DataMapper(response.data);
        });


    });

    $dragon.onChannelMessage(function (channels, message) {
        console.log(channels)

        if (indexOf.call(channels, 'current_board_channel') > -1) {
            $scope.$apply(function () {

                console.log(message)
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
        //if (indexOf.call(channels, 'board_channel') > -1) {
        //    $scope.$apply(function () {
        //        vm.dataMapper.mapData(vm.boards, message);
        //    });
        //}
    });

}