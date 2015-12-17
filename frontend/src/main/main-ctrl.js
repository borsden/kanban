angular.module('Kanban')
    .controller('MainCtrl', ['$scope', '$dragon', 'dateFormatter', 'CurrentUser', MainCtrl]);
function MainCtrl($scope, $dragon, dateFormatter, CurrentUser) {
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
    });

    });


    $dragon.onChannelMessage(function (channels, message) {
        if (indexOf.call(channels, 'board_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.boards, message);
            });
        }
    });


    vm.dateFormatter = function (JSONTime) {
        return dateFormatter(JSONTime);
    };


}