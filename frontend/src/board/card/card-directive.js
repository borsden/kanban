angular
    .module('Kanban')
    .directive('card', [card]);

function card() {
    var directive = {
        templateUrl: 'card.html',
        restrict: 'EA',
        controller: 'CardCtrl',
        controllerAs: 'card_ctrl',

        link: function (scope, elem, attrs, ctrl) {
            ctrl.card = scope.card;
            ctrl.changing_card = angular.copy(ctrl.card);
        }
    };
    return directive;

}