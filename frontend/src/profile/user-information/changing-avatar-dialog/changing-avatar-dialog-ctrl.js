angular.module('Kanban')
    .controller('ChangingAvatarDialogCtrl', ['$mdDialog', '$scope', 'first_image', 'ChangeAvatar', ChangingAvatarDialogCtrl]);
function ChangingAvatarDialogCtrl($mdDialog, $scope, first_image, ChangeAvatar) {
    var vm = this;
    console.log(first_image);
    vm.first_image = first_image;
    vm.cropped_image = '';
    vm.empty_image = true;

    vm.saveAvatar = function () {
        ChangeAvatar.post({image: vm.cropped_image}, function (result) {
            $mdDialog.hide(result.avatar);
        }, function (error) {
            $mdDialog.cancel();
        });
    }
}