angular.module('Kanban')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            // Если url не удовлетворяет ни одному условию, то переходим на страницу задач
            $urlRouterProvider.otherwise('/board');
            //
            // Routes
            $stateProvider
                .state('board', {
                    url: '/board/:id',
                    views: {
                        //Главный вид
                        '': {
                            templateUrl: 'board.html',
                            controller: 'BoardCtrl',
                            controllerAs: 'board_ctrl'
                        }
                    }
                });
            $stateProvider
                .state('scrap', {
                    url: '/scrap',
                    views: {
                        //Главный вид
                        '': {
                            templateUrl: 'scrap.html',
                            controller: 'ScrapCtrl',
                            //controllerAs: 'scrap_ctrl'
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