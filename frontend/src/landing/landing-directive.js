angular
    .module('Kanban')
    .directive('authReg', ['$window', authReg]);

function authReg($window) {
    var directive = {
        templateUrl: 'landing.html',
        controller: 'LandingCtrl',
        controllerAs: 'landing_ctrl',
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            angular.element($window).bind("scroll", function () {
                scope.headerVisible = this.pageYOffset >= $window.innerHeight - 64;
                scope.$apply();
            });
        }
    };
    return directive;

}