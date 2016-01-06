angular.module('Kanban')
    .controller('CardSettingsDialogCtrl', ['$mdDialog', '$scope', 'dateFormatter', 'card', CardSettingsDialogCtrl]);
function CardSettingsDialogCtrl($mdDialog, $scope, dateFormatter, card) {

    var vm = this;
    vm.card = angular.copy(card);
    card.last_date = dateFormatter(card.last_date);
    vm.card.last_date = dateFormatter(vm.card.last_date);

    //Проверка, является ли данный пользователем работником.
    vm.workerIsUser = function(){
        return $scope.main_ctrl.user.id==vm.card.worker
    };

    // Сравниваем карты и если они не равны, то отображаем кнопку подтверждения изменения
    vm.compareCards = function () {
        return angular.equals(vm.card, card)
    };
    vm.archiveCard = function () {
        $mdDialog.hide(['archive']);
    };
    vm.deleteCard = function () {
        $mdDialog.hide(['delete']);
    };
    vm.saveCard = function () {
        $mdDialog.hide(['change', vm.card]);
    };

    vm.addLastDate = function () {
        vm.card.last_date = new Date();
    };
    vm.hide = function () {
        $mdDialog.hide();
    };
    // Изменение работника карты.
    vm.workOnCard = function () {
        if ($scope.main_ctrl.user.id == vm.card.worker) {
            vm.card.worker = null
        }
        else {
            vm.card.worker = $scope.main_ctrl.user.id;
        }
    };
}