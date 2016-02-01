angular.module('Kanban')
    .controller('CardCtrl', ['$scope', '$mdDialog', '$mdMedia', 'Cards', 'ArchiveCard', CardCtrl]);
function CardCtrl($scope, $mdDialog, $mdMedia, Cards, ArchiveCard) {
    var vm = this;
    // Функция получения имени работника
    /*
     vm.get_worker = function (worker) {
     for (var i = 0; i < $scope.board_ctrl.current_board.members.length; i++) {
     if ($scope.board_ctrl.current_board.members[i]['id'] == worker) {
     return $scope.board_ctrl.current_board.members[i]
     }}};
     */


    //Модульное окно изменения карточки
    vm.showSettings = function (ev) {
        $mdDialog.show({
            controller: 'CardSettingsDialogCtrl',
            controllerAs: 'card_settings_dialog_ctrl',
            templateUrl: 'card-settings-dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            locals: {
                card: vm.card
            }
        })
            .then(function (answer) {
                // Если сохраняем изменения
                if (answer[0] == 'change') {
                    Cards.update(answer[1], function (data) {
                        },
                        function () {

                        });
                }
                // Если архивируем карту
                else if (answer[0] == 'archive') {
                    ArchiveCard.archive({}, {id: vm.card['id']}, function () {
                    });
                }
                // Если удаляем карту
                else if (answer[0] == 'delete') {
                    Cards.delete({}, {id: vm.card['id']}, function () {
                    });
                }
            }, function () {
            });
    };
}