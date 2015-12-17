angular.module('Kanban')
    .controller('BoardHeaderCtrl', ['$scope','$mdDialog', '$mdMedia', BoardHeaderCtrl]);
function BoardHeaderCtrl($scope,$mdDialog,$mdMedia) {
    var vm = this;
vm.is_open = false;
  vm.showSettings = function(ev) {
    $mdDialog.show({
      controller: 'BoardSettingsDialogCtrl',
      controllerAs: 'board_settings_dialog_ctrl',
      templateUrl: 'board-settings-dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $mdMedia('sm') && vm.customFullscreen
    })
    .then(function(answer) {
      vm.status = 'You said the information was "' + answer + '".';
    }, function() {
      vm.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('sm');
    }, function(sm) {
      vm.customFullscreen = (sm === true);
    });
  };
}