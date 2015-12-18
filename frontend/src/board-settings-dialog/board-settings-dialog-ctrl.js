angular.module('Kanban')
    .controller('BoardSettingsDialogCtrl', ['$mdDialog', '$scope', 'Boards', 'CreateBoard', 'board', BoardSettingsDialogCtrl]);
function BoardSettingsDialogCtrl($mdDialog, $scope, Boards, CreateBoard, board) {
    var vm = this;

    vm.board = {};
    if (board) {
        vm.changing = true;
        vm.board = angular.copy(board);

    }
    vm.filterSelected = true;

    vm.members = [];
    vm.addContact = function (contact) {
        vm.members.push(contact)
    };
    vm.querySearch = function (query) {
        return query ?
            vm.colleagues.filter(createFilterFor(query)) : [];
    };
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(colleague) {
            return (colleague.fullname.toLowerCase().indexOf(lowercaseQuery) != -1);
        };
    }

    $scope.$watch('main_ctrl.colleagues', function (colleagues) {
        vm.colleagues = colleagues;
        vm.colleagues[0].image = 'http://lorempixel.com/50/50/people?1';
        if (vm.changing) {
            for (var i = 0; i < vm.board.members.length; i++) {
                for (var j = 0; j < vm.colleagues.length; j++) {
                    if (vm.board.members[i] == vm.colleagues[j].id) {
                        if (vm.members.indexOf(vm.colleagues[j]) == -1) {
                            vm.members.push(vm.colleagues[j]);
                        }
                    }
                }
            }
        }
    }, true);


    vm.columns = [];
    vm.adding_column = {title: ''};
    vm.addColumn = function () {
        vm.columns.push(vm.adding_column);
        vm.adding_column = {title: ''};
    };
    vm.deleteColumn = function (column) {
        //vm.columns.push(vm.adding_column);
        //vm.adding_column = {title: ''};
        for (var i = 0; i < vm.columns.length; i++) {
            if (vm.columns[i] == column) {
                vm.columns.splice(i, 1);
                break;
            }
        }
    };

    vm.changeColumn = function (column) {
        vm.changing_column_original = column;
        vm.changing_column = angular.copy(column)
    };
    vm.changeColumnConfirm = function () {
        for (var i = 0; i < vm.columns.length; i++) {
            if (vm.columns[i] == vm.changing_column_original) {
                vm.columns[i] = vm.changing_column;
                break;
            }
        }
        vm.changing_column_original = {};
        vm.changing_column = {};
    };
    vm.changeColumnCancel = function () {
        vm.changing_column_original = {};
        vm.changing_column = {};
    };


    vm.saveBoard = function () {
        vm.board.members = [$scope.main_ctrl.user.id];
        angular.forEach(vm.members, function (colleague) {
            vm.board.members.push(colleague.id)

        });
        if (vm.changing) {
            Boards.update(vm.board, function (data) {
            });
        }
        else {
            CreateBoard.create(vm.board, function (data) {
                },
                function () {
                    //$scope.showAlertError('При добавлении счета');
                    //$scope.cancel()
                });
        }
    };


    vm.cancel = function () {
        $mdDialog.cancel();
    };
}