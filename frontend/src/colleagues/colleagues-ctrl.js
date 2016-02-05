angular.module('Kanban')
    .controller('ColleaguesCtrl', ['$scope', 'Colleagues', 'InvitedMembers', 'DeleteInvitedMember',
        'AllFollowers', 'Follower', 'DeleteFollower', ColleaguesCtrl]);
function ColleaguesCtrl($scope, Colleagues, InvitedMembers, DeleteInvitedMember,
                        AllFollowers, Follower, DeleteFollower) {
    var vm = this;
    vm.invited_members = [];
    Colleagues.get({}, {}).$promise.then(function (result) {
        vm.colleagues = result;
        console.log(result)
    });
    InvitedMembers.get({}, {}).$promise.then(function (result) {
        vm.invited_members = result;
        //console.log(result)
    });
    AllFollowers.get({}, {}).$promise.then(function (result) {
        vm.followers = result;
    });

    vm.openInviteEmailPopover = function ($mdOpenMenu, ev) {
        //originatorEv = ev;
        $mdOpenMenu(ev);
    };
    $scope.$watch(function () {
        return $scope.new_invited_member
    }, function (newValue) {
        if (newValue != undefined) {
            vm.invited_members.push(newValue);
            $scope.new_invited_member = undefined;
        }
    });
    vm.deleteInvitedMember = function (member_id) {
        DeleteInvitedMember.delete({id: member_id}, function (response) {
            //console.log(response);
            for (var i = 0; i < vm.invited_members.length; i++) {
                if (vm.invited_members[i].id == member_id) {
                    vm.invited_members.splice(i, 1);
                    break;
                }
            }
        });
    };
    vm.submitFollower = function (follower) {
        Follower.update(follower, function (response) {
            var index = vm.followers.indexOf(follower);
            vm.followers.splice(index, 1);
            var not_in_colleagues;
            for (var j = 0; j < response.length; j++) {
                not_in_colleagues = false;
                for (var i = 0; i < vm.colleagues.length; i++) {
                    if (vm.colleagues[i].id == response[j].id) {
                        vm.colleagues[i].boards = response[j].boards;
                        not_in_colleagues = true;
                        break;
                    }
                }
                if (!not_in_colleagues) {
                    vm.colleagues.push(response[j])
                }
            }
        });
    };
    vm.deleteFollower = function (follower) {
        DeleteFollower.delete(follower, function (response) {
            var index = vm.followers.indexOf(follower);
            vm.followers.splice(index, 1);
        });
    }
}