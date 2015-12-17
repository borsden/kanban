angular.module('Kanban')
    .controller('CardCtrl', ['$scope', '$mdDialog', '$mdMedia','Cards', CardCtrl]);
function CardCtrl($scope, $mdDialog, $mdMedia,Cards) {
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
                    //vm.card = angular.copy(answer[1])
                    Cards.update(answer[1], function (data) {
                        //
                    },
                    function () {

                    });
                }
                else if (answer[0] == 'archive') {
                    vm.card.archive = true
                }
                else if (answer[0] == 'delete') {
                    /*for (var i = 0; i < $scope.column_ctrl.column.cards.length; i++) {
                        if ($scope.column_ctrl.column.cards[i]['id'] == vm.card['id']) {
                            $scope.column_ctrl.column.cards.splice(i, 1);
                            break;
                        }
                    }*/
                    Cards.delete({}, {id: vm.card['id']}, function () {});
                }
            }, function () {
                //console.log('none')
            });
        $scope.$watch(function () {
            return $mdMedia('sm');
        }, function (sm) {
            vm.customFullscreen = (sm === true);
        });
    };
}