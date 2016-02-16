angular.module('Kanban')
    .controller('ProfileCtrl', ['$scope', '$dragon', ProfileCtrl]);
function ProfileCtrl($scope, $dragon) {
    var vm = this;
    $dragon.onReady(function () {
        // Получаем карточки текущего пользователя
        $dragon.getList('card', {worker__id: $scope.main_ctrl.user.id}).then(function (response) {
            vm.user_cards = response.data;
        });
        $dragon.subscribe('card', 'user_card_channel', {worker__id: $scope.main_ctrl.user.id}).then(function (response) {
            vm.dataMapper = new DataMapper(response.data);

        });

    });

    $dragon.onChannelMessage(function (channels, message) {
        if (indexOf.call(channels, 'user_card_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.user_cards, message);
            });
        }
    });
}