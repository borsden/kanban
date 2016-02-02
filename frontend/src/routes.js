angular.module('Kanban')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            // Если url не удовлетворяет ни одному условию, то переходим на данную страницу
            $urlRouterProvider.otherwise('/profile');
            //
            // Routes
            $stateProvider
                .state('board', {
                    url: '/board/:id',
                    views: {
                        //Отображение доски
                        '': {
                            templateUrl: 'board.html',
                            controller: 'BoardCtrl',
                            controllerAs: 'board_ctrl'
                        }
                    }
                })
                .state('profile', {
                    url: '/profile',
                    views: {
                        '': {
                            templateUrl: 'profile.html',
                            controller: 'ProfileCtrl',
                            controllerAs: 'profile_ctrl'
                        }
                    }
                })
                .state('settings', {
                    url: '/settings',
                    views: {
                        '': {
                            templateUrl: 'settings.html',
                            controller: 'SettingsCtrl',
                            controllerAs: 'settings_ctrl'
                        }
                    }
                })
                .state('colleagues', {
                    url: '/colleagues',
                    views: {
                        '': {
                            templateUrl: 'colleagues.html',
                            controller: 'ColleaguesCtrl',
                            controllerAs: 'colleagues_ctrl'
                        }
                    }
                });
            //if (window.history && window.history.pushState) {
            //    $locationProvider.html5Mode({
            //        enabled: true,
            //        requireBase: false
            //    }).hashPrefix('/')
            //}
        }

    ]);