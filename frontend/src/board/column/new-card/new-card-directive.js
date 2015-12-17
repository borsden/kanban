angular
    .module('Kanban')
    .directive('newCard', [newCard]);

function newCard() {
    var directive = {
        templateUrl: 'new-card.html',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
            //elem.addClass("board-column")
        }
    };
    return directive;

}