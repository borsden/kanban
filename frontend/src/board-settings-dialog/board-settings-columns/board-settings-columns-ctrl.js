angular.module('Kanban')
    .controller('BoardColumnsCtrl', [BoardSettingsColumnsCtrl]);
function BoardSettingsColumnsCtrl() {
    var vm = this;
    vm.adding_column = {title: ''};

    vm.addColumn = function () {
        vm.columns.push(vm.adding_column);
        vm.adding_column = {title: ''};
    };
    // Удаление колонки. Если она существует, помечаем ее как удаленную, если нет, то просто убираем из списка.
    vm.deleteColumn = function (column) {
        for (var i = 0; i < vm.columns.length; i++) {
            if (vm.columns[i] == column) {
                if (column.id) {
                    column.type = 'deleting'
                }
                else {
                    vm.columns.splice(i, 1);
                }
                break;
            }
        }
    };

    vm.changeColumn = function (column) {
        vm.changing_column_original = column;
        vm.changing_column = angular.copy(column)
    };
    // Изменяем колонку. Если она существует, то помимо добавления изменения, помечаем ее как измененную.
    vm.changeColumnConfirm = function () {
        for (var i = 0; i < vm.columns.length; i++) {
            if (vm.columns[i] == vm.changing_column_original) {
                vm.columns[i] = vm.changing_column;
                if (vm.columns[i].id) {
                    vm.columns[i].type = 'changing'
                }
                break;
            }
        }
        vm.changing_column_original = {};
        vm.changing_column = {};
    };
    // Отмена изменения колонки.
    vm.changeColumnCancel = function () {
        vm.changing_column_original = {};
        vm.changing_column = {};
    };

}