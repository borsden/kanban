// Конфиг для календаря и для csrf.
angular.module('Kanban')
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('light-blue')
            .warnPalette('red', {
                'default': '900'
            })
            .backgroundPalette('grey', {
                'default': '200'
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