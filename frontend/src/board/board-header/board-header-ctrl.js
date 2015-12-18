angular.module('Kanban')
    .controller('BoardHeaderCtrl', ['$scope', '$mdDialog', '$mdMedia', BoardHeaderCtrl]);
function BoardHeaderCtrl($scope, $mdDialog, $mdMedia) {
    var vm = this;
    vm.is_open = false;

}