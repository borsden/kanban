angular.module('Kanban')
    .controller('BoardSettingsDialogCtrl', ['$mdDialog',BoardSettingsDialogCtrl]);
function BoardSettingsDialogCtrl($mdDialog) {
    var vm = this;
this.cancel = function() {
    $mdDialog.cancel();
  };
}