angular.module('Kanban')
    .controller('MainCtrl', ['$scope', '$dragon', 'dateFormatter', 'CurrentUser', MainCtrl]);
function MainCtrl($scope, $dragon, dateFormatter, CurrentUser) {
    var vm = this;
    vm.user = {id: 1};

    CurrentUser.get({}, {}).$promise.then(function (data) {
        vm.user = data;

    });


    //$dragon.onChannelMessage(function (channels, message) {
    //
    //    });

    //vm.boards


    vm.dateFormatter = function (JSONTime) {
        return dateFormatter(JSONTime);
    };


}