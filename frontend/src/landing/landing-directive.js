angular.module('Kanban')
    .directive('landing', ['$window', landing]);
// Директива лендинга
function landing($window) {
    var directive = {
        templateUrl: 'landing.html',
        controller: 'LandingCtrl',
        controllerAs: 'landing_ctrl',
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            // В случае, если первый слайд был пролистан, появляется верхнее меню с кнопками входа и регистрации
            angular.element($window).bind("scroll", function () {
                scope.headerVisible = this.pageYOffset >= $window.innerHeight - 64;
                scope.$apply();
            });
        }
    };
    return directive;

}