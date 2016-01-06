angular.module('Kanban')
    .controller('ColumnHeaderCtrl', ['Columns', ColumnHeaderCtrl]);
function ColumnHeaderCtrl(Columns) {
    var vm = this;
    // Изменение названия колонки
    vm.changed = false;
    vm.changeColumnTitle = function () {
        vm.changed = true;
    };
    vm.changeColumnCancel = function () {
        vm.changing_column = angular.copy(vm.column);
        vm.changed = false;
    };
    vm.changeColumnConfirm = function () {
        Columns.update(vm.changing_column, function (data) {

        });
        vm.changed = false;
    };

}
