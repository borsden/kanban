angular.module('Kanban')
    .controller('UserInformationCtrl', ['$mdDialog', '$scope', 'UpdateUser', UserInformationCtrl]);
function UserInformationCtrl($mdDialog, $scope, UpdateUser) {
    var vm = this;
    var current_user = $scope.main_ctrl.user;
    var previous_user = angular.copy($scope.main_ctrl.user);

    // Проверяем, выбрал ли пользователь изображение
    var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function ($scope) {
                // Модальное окно с обрезкой загруженного изображения до квадратной формы
                $mdDialog.show({
                    controller: 'ChangingAvatarDialogCtrl',
                    controllerAs: 'changing_avatar_dialog_ctrl',
                    templateUrl: 'changing-avatar-dialog.html',
                    parent: angular.element(document.body),
                    //targetEvent: ev,
                    clickOutsideToClose: true,
                    scope: $scope, // Наследуем $scope
                    preserveScope: true,
                    locals: {
                        first_image: evt.target.result
                    }
                    //fullscreen: $mdMedia('xs'), //Размер на весь экран
                }).then(function (result_image_url) {
                    // Сохраняем новый аватар
                    current_user.avatar = result_image_url;
                })
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

    vm.profile_changed = function () {
        return (previous_user.first_name != current_user.first_name)
            || (previous_user.last_name != current_user.last_name)
            || (previous_user.patronymic != current_user.patronymic)
    };
    vm.saveProfileChanged = function () {
        UpdateUser.update(current_user, function (response) {
            $scope.main_ctrl.user = response;
            current_user = $scope.main_ctrl.user;
            previous_user = angular.copy($scope.main_ctrl.user);
        }, function (error) {
            console.log(error)
        })
    }
}