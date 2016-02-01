// Конфиг для календаря и для csrf.
angular.module('Kanban')
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('cyan')
            .warnPalette('red')
            .backgroundPalette('cyan', {
                'default': '50'
            });
        $mdThemingProvider.theme('taskTheme')
            .primaryPalette('grey', {
                'default': '50'
            })
            .accentPalette('orange', {
                'default': '200'
            })
            .warnPalette('red', {
                'default': '300'
            });

    }


    ]);