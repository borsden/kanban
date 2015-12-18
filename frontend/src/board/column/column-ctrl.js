angular.module('Kanban')
    .controller('ColumnCtrl', ['$scope', '$mdDialog', '$mdMedia', 'CreateCard', ColumnCtrl]);
function ColumnCtrl($scope, $mdDialog, $mdMedia, CreateCard) {
    var vm = this;

    vm.isCurrentCategory = function (card) {
        return card.column == vm.column.id
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
