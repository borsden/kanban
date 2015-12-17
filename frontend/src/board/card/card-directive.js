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
            scope.$watch('board_ctrl.cards', function (cards) {
                if (cards && cards.length) {
                    for (var i = 0; i < cards.length; i++) {
                        if (cards[i]['id'] == attrs.card) {
                            ctrl.card = cards[i];
                            ctrl.changing_card = angular.copy(ctrl.card);
                            break;
                        }
                    }
                }
            }, true);



        }
    };
    return directive;

}