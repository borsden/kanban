angular
    .module('Kanban')
    .directive('inviteMemberPopover', ['InvitedMembers', inviteMemberPopover]);

function inviteMemberPopover(InvitedMembers) {
    var directive = {
        templateUrl: 'invite-member-popover.html',
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var select_element = angular.element(elem[0].getElementsByClassName('md-select-menu-container__invite-email__boards'));
            var hasClass = function (element, cls) {
                var classes = element.attr('class');
                return classes.split(' ').indexOf(cls) !== -1;
            };
            scope.invited_member = {email: null, board: null};
            scope.$watch(function () {
                return hasClass(elem.parent(), 'md-leave');
            }, function (value) {
                if (value == true) {
                    scope.invited_member = {email: null, board: null};
                    select_element.addClass('md-leave');
                }
            });
            scope.inviteMember = function () {
                InvitedMembers.post(scope.invited_member, function (result) {
                    scope.$parent.new_invited_member = result;
                })
            };
        }
    };
    return directive;

}