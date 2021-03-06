angular.module('Kanban')
    .controller('BoardSettingsDialogCtrl', ['$mdDialog', '$scope', 'Boards', 'CreateBoard',
        'ChangeBoardColumns', 'board', 'columns', BoardSettingsDialogCtrl]);
function BoardSettingsDialogCtrl($mdDialog, $scope, Boards, CreateBoard,
                                 ChangeBoardColumns, board, columns) {
    var vm = this;
    vm.columns = [];
    vm.first_columns = [];
    vm.board = {};
    // Случай, если мы редактируем доску
    if (board) {
        vm.changing = true;
        vm.board = angular.copy(board);
        // Если мы редактируем доску, то добавим в список колонок существующие колонки
        if (board.columns) {
            if (columns) {
                // Cортируем колонки по их порядку
                columns.sort(function (a, b) {
                    return a.position - b.position
                });
                var column;
                for (var i = 0; i < columns.length; i++) {
                    column = columns[i];
                    vm.columns.push({id: column.id, title: column.title, position: i})
                }
                vm.first_columns = angular.copy(vm.columns);
            }
        }
    }
    //Сравниваем доски, категории и пользователей, и если они не равны, то отображаем кнопку изменения
    vm.compareBoards = function () {
        return (angular.equals(vm.board, board) &&
        angular.equals(vm.columns, vm.first_columns))
    };
    vm.filterSelected = true;
    //После сохранения изменения в доске, если они были, сохраняются изменения в колонках
    vm.saveBoard = function () {
        if (vm.board != board) {
            if (vm.changing) {
                Boards.update(vm.board, function (data) {
                    // Если есть изменения в колонках, сохраняем их
                    if (vm.columns != vm.first_columns) {
                        ChangeBoardColumns.post({columns: vm.columns, id: data.id}, function (result) {
                        })
                    }
                });
            }
            else {
                CreateBoard.create(vm.board, function (data) {
                    ChangeBoardColumns.post({columns: vm.columns, id: data.id}, function (result) {
                    })
                });
            }
        }
        vm.cancel();
    };
    vm.cancel = function () {
        $mdDialog.cancel();
    };
}