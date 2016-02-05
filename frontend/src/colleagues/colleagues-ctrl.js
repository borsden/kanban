angular.module('Kanban')
    .controller('ColleaguesCtrl', ['$scope', 'Colleagues', 'InvitedMembers', 'DeleteInvitedMember',
        'AllFollowers', 'Follower', 'DeleteFollower', ColleaguesCtrl]);
function ColleaguesCtrl($scope, Colleagues, InvitedMembers, DeleteInvitedMember,
                        AllFollowers, Follower, DeleteFollower) {
    var vm = this;
    vm.invited_members = [];
    // Пользователи, с которыми есть общие доски
    Colleagues.get({}, {}).$promise.then(function (result) {
        vm.colleagues = result;
    });
    // Приглашенные нами пользователи
    InvitedMembers.get({}, {}).$promise.then(function (result) {
        vm.invited_members = result;
    });
    // Пользователи, которые пригласили нас
    AllFollowers.get({}, {}).$promise.then(function (result) {
        vm.followers = result;
    });

    // Открытие выпадающего меню с добавлением пользователя
    vm.openInviteEmailPopover = function ($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };
    // Проверка приглашения нового пользователя. Если пользователь приглашен, то добавляем его в список
    $scope.$watch(function () {
        return $scope.new_invited_member
    }, function (newValue) {
        if (newValue != undefined) {
            vm.invited_members.push(newValue);
            $scope.new_invited_member = undefined;
        }
    });
    // Удаление приглашения пользователя
    vm.deleteInvitedMember = function (member_id) {
        DeleteInvitedMember.delete({id: member_id}, function (response) {
            for (var i = 0; i < vm.invited_members.length; i++) {
                if (vm.invited_members[i].id == member_id) {
                    vm.invited_members.splice(i, 1);
                    break;
                }
            }
        });
    };
    // Подтверждение приглашения в новую доску
    vm.submitFollower = function (follower) {
        Follower.update(follower, function (response) {
            // Удаляем приглашения из списка приглашений
            var index = vm.followers.indexOf(follower);
            vm.followers.splice(index, 1);
            // Переменная, которая служит для проверки наличия пользователя в списке коллег
            var not_in_colleagues;
            for (var j = 0; j < response.length; j++) {
                not_in_colleagues = false;
                for (var i = 0; i < vm.colleagues.length; i++) {
                    // Если пользователь в списке коллег, обновляем общие доски
                    if (vm.colleagues[i].id == response[j].id) {
                        vm.colleagues[i].boards = response[j].boards;
                        not_in_colleagues = true;
                        break;
                    }
                }
                // Если пользователя нет, то добавляем его
                if (!not_in_colleagues) {
                    vm.colleagues.push(response[j])
                }
            }
        });
    };
    // Удаление приглашения в новую доску
    vm.deleteFollower = function (follower) {
        DeleteFollower.delete(follower, function (response) {
            var index = vm.followers.indexOf(follower);
            vm.followers.splice(index, 1);
        });
    }
}