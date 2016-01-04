angular.module('Kanban')
    .controller('CardCtrl', ['$scope', '$mdDialog', '$mdMedia', 'Cards', 'ArchiveCard', CardCtrl]);
function CardCtrl($scope, $mdDialog, $mdMedia, Cards, ArchiveCard) {
    var vm = this;
    vm.get_worker = function (worker) {
        for (var i = 0; i < $scope.board_ctrl.current_board.members.length; i++) {
            if ($scope.board_ctrl.current_board.members[i]['id'] == worker) {
                return $scope.board_ctrl.current_board.members[i]
            }
        }
    }
    vm.showSettings = function (ev) {
        $mdDialog.show({
            controller: 'CardSettingsDialogCtrl',
            controllerAs: 'card_settings_dialog_ctrl',
            templateUrl: 'card-settings-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            locals: {
                card: vm.card
            },
            fullscreen: $mdMedia('sm') && vm.customFullscreen
        })
            .then(function (answer) {
                //console.log(answer);
                if (answer[0] == 'change') {
                    Cards.update(answer[1], function (data) {
                        },
                        function () {

                        });
                }
                else if (answer[0] == 'archive') {
                    ArchiveCard.archive({}, {id: vm.card['id']}, function () {
                    });
                }
                else if (answer[0] == 'delete') {
                    Cards.delete({}, {id: vm.card['id']}, function () {
                    });
                }
            }, function () {
            });
        $scope.$watch(function () {
            return $mdMedia('sm');
        }, function (sm) {
            vm.customFullscreen = (sm === true);
        });
    };
}