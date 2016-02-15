angular.module('Kanban')
    .controller('ColleaguesCtrl', ['$scope', '$dragon', 'DeleteInvitedMember',
        'Follower', 'DeleteFollower', ColleaguesCtrl]);
function ColleaguesCtrl($scope, $dragon, DeleteInvitedMember,
                        Follower, DeleteFollower) {
    var vm = this;
    vm.invited_members = [];
    vm.followers = [];


    $dragon.onReady(function () {
        // Пользователи, которые пригласили нас
        $dragon.getList('follower', {}).then(function (response) {
            vm.followers = response.data;

        });
        $dragon.subscribe('follower', 'follower_channel', {}).then(function (response) {
            vm.dataMapper = new DataMapper(response.data);
        });
        // Приглашенные нами пользователи
        $dragon.getList('invited_member', {}).then(function (response) {
            vm.invited_members = response.data;
        });
        $dragon.subscribe('invited_member', 'invited_member_channel', {}).then(function (response) {
            vm.dataMapper = new DataMapper(response.data);
        });
    });


    $dragon.onChannelMessage(function (channels, message) {
        if (indexOf.call(channels, 'follower_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.followers, message);
            });
        }
        if (indexOf.call(channels, 'invited_member_channel') > -1) {
            $scope.$apply(function () {
                vm.dataMapper.mapData(vm.invited_members, message);
            });
        }
    });

    // Получение списка общих задач
    vm.getBoards = function (colleague, boards) {
        var colleague_id = colleague.id;
        var boards_objects = [];
        for (var i = 0; i < boards.length; i++) {
            if (boards[i].members.indexOf(colleague_id) != -1) {
                boards_objects.push(boards[i])
            }
        }
        return boards_objects
    };

    // Открытие выпадающего меню с добавлением пользователя
    vm.openInviteEmailPopover = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };
    // Todo: зафиксировать ошибки
    // Удаление приглашения пользователя
    vm.deleteInvitedMember = function (member_id) {
        DeleteInvitedMember.delete({id: member_id}, function (response) {
        });
    };

    // Подтверждение приглашения в новую доску
    vm.submitFollower = function (follower) {
        Follower.update(follower, function (response) {

        });
    };
    // Удаление приглашения в новую доску

    vm.deleteFollower = function (follower) {
        DeleteFollower.delete(follower, function (response) {
        }, function (error) {
            if (error.status == 405) {
                console.log('Вы не можете удалять данное приглашение')
            }
            else {
                console.log('Возникла непредвиденная ошибка')
            }
        });
    }
}