angular.module('Kanban')
    .controller('BoardHeaderCtrl', [BoardHeaderCtrl]);
function BoardHeaderCtrl() {
    var vm = this;
    vm.is_open = false;

}