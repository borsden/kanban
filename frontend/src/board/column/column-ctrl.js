angular.module('Kanban')
    .controller('ColumnCtrl', ['CreateCard', ColumnCtrl]);
function ColumnCtrl(CreateCard) {
    var vm = this;

    // Добавление карточки в данной категории.
    vm.add = false;
    vm.addCard = function () {
        vm.adding_card = {title: "Новая задача", column: vm.column.id};
        vm.add = true;
    };
    // Отмена добавления
    vm.addCardCancel = function () {
        vm.adding_card = {};
        vm.add = false;
    };
    // Подтверждение добавления
    vm.addCardConfirm = function () {
        CreateCard.create(vm.adding_card, function (data) {
            },
            function () {
            });
        vm.adding_card = {};
        vm.add = false;
    };
}
