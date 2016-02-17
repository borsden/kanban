angular.module('Kanban')
    .controller('BoardMembersDialogCtrl', ['$state', '$dragon', '$mdDialog',
        '$scope', 'DeleteInvitedMember', 'DeleteBoardMember', 'board', BoardMembersDialogCtrl]);
function BoardMembersDialogCtrl($state, $dragon, $mdDialog, $scope, DeleteInvitedMember, DeleteBoardMember, board) {
    var vm = this;
    vm.board = board;
    $dragon.onReady(function () {
        // Пользователи, с которыми есть общие доски - Коллеги
        $dragon.getList('invited_member_board', {board__id: vm.board.id}).then(function (response) {
            vm.invited_members = response.data;
        });

        $dragon.subscribe('invited_member_board', 'invited_member_board_channel', {board__id: vm.board.id}).then(function (response) {
            vm.dataMapper = new DataMapper(response.data);
        });
    });
    $dragon.onChannelMessage(function (channels, message) {
        if (indexOf.call(channels, 'invited_member_board_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.invited_members, message);
            });
        }
    });
    vm.deleteInvitedMember = function (invited_member) {
        DeleteInvitedMember.delete({id: invited_member.id}, function (response) {
        });
    };
    vm.deleteMember = function (member) {
        DeleteBoardMember.delete({id: member.id, board_id: vm.board.id}, function (response) {
            //if (member.id == $scope.main_ctrl.user.id) {
            //    $state.go('profile')
            //}
        });
    };
    //Добавление приглашения пользователя
    vm.openInviteEmailPopover = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };


    vm.cancel = function () {
        $mdDialog.cancel();
    };
}