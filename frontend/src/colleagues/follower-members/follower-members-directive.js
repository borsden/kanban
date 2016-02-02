angular
    .module('Kanban')
    .directive('followerMembers', [followerMembers]);

function followerMembers() {
    var directive = {
        templateUrl: 'follower-members.html',
        restrict: 'EA',
        link: function (scope, elem, attrs) {

        }
    };
    return directive;

}