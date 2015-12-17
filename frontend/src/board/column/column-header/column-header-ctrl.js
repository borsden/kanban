angular.module('Kanban')
    .controller('ColumnHeaderCtrl', ['Columns', ColumnHeaderCtrl]);
function ColumnHeaderCtrl(Columns) {
    var vm = this;
    vm.changed = false;
    vm.changeColumnTitle = function () {
        vm.changed = true;
    };
    vm.changeColumnCancel = function () {
        vm.changing_column = angular.copy(vm.column);
        vm.changed = false;
    };
    vm.changeColumnConfirm = function () {
        //vm.column = angular.copy(vm.changing_column)
        Columns.update(vm.changing_column, function (data) {

        });
        vm.changed = false;
    };

}
