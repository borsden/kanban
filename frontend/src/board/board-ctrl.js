angular.module('Kanban')
    .controller('BoardCtrl', ['$scope', '$dragon', '$stateParams', 'Columns', BoardCtrl]);
function BoardCtrl($scope, $dragon, $stateParams, Columns) {
    var board_id = $stateParams.id;
    var vm = this;

    vm.onSortEnd = function () {
        for (var i = 0; i < vm.columns.length; i++) {
            //    var arr_ = [];
            //    for (var j = 0; j < vm.columns[i].cards_container.length; j++) {
            //        arr_.push(vm.columns[i].cards_container[j].id)
            //    }
            //    vm.columns.cards = arr_;
            //    //console.log(vm.columns[i]);
            Columns.update(vm.columns[i], function (data) {
            });
        }
    };

    vm.dict_done = {columns_done: false, cards_done: false};
    vm.all_done = false;
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
            console.log(vm.all_done)
        }

    }, true);

    $dragon.onReady(function () {

        $dragon.getSingle('board', {id: board_id}).then(function (response) {
            vm.current_board = response.data;
            $dragon.getList('column', {board__id: vm.current_board.id}).then(function (response) {
                vm.columns = response.data;
                vm.dict_done.columns_done = true;
            });
            $dragon.subscribe('column', 'column_channel', {board__id: vm.current_board.id}).then(function (response) {
                vm.dataMapper = new DataMapper(response.data);
            });
            $dragon.getList('card', {column__board__id: vm.current_board.id}).then(function (response) {
                vm.cards = response.data;
                vm.dict_done.cards_done = true;
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
                vm.dataMapper.mapData(vm.current_board, message);
            });
        }
        if (indexOf.call(channels, 'card_channel') > -1) {
            $scope.$apply(function () {
                //console.log(message);
                vm.dataMapper.mapData(vm.cards, message);
                if (message.action == "deleted") {
                    for (var i = 0; i < vm.columns.length; i++) {
                        var index = vm.columns[i].cards.indexOf(message.data.id);
                        if (message.data.column == vm.columns[i].id && index != -1) {
                            vm.columns[i].cards.splice(index, 1);
                            break;
                        }
                    }
                }
                else if (message.action == "created") {
                    for (var i = 0; i < vm.columns.length; i++) {
                        //var index = vm.columns[i].cards.indexOf(message.data.id);
                        if (message.data.column == vm.columns[i].id) {
                            vm.columns[i].cards.push(message.data.id);
                            break;
                        }
                    }
                }
            });
        }
        if (indexOf.call(channels, 'column_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.columns, message);
            });
        }
    });

}