angular.module('Kanban')
    .controller('BoardHeaderCtrl', ['$mdDialog', '$scope', BoardHeaderCtrl]);
function BoardHeaderCtrl($mdDialog, $scope) {
    var vm = this;
    vm.is_open = false;
    // Модульное окно создания или изменения доски.
    vm.boardMembers = function (ev, board) {
        $mdDialog.show({
            controller: 'BoardMembersDialogCtrl',
            controllerAs: 'board_members_dialog_ctrl',
            templateUrl: 'board-members-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope, // Наследуем $scope
            preserveScope: true,
            //fullscreen: $mdMedia('xs'), //Размер на весь экран
            //В случае изменения доски, отправляем ее и ее колонки в качестве переменной.
            locals: {
                board: board
            }
        });
    };

}