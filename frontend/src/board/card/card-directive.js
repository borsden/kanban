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
            //console.log(scope.board_ctrl.cards);
            angular.forEach(scope.board_ctrl.cards, function (card) {
                if (card.id == scope.card_id) {
                    ctrl.card = card;
                    ctrl.changing_card = angular.copy(ctrl.card);
                }
            });


        }
    };
    return directive;

}