//Сервис для пользователей
angular.module('Kanban')
    .factory('CurrentUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'current_user/ ', {id: "@id"}, {
                get: {method: 'GET'},
                update: {
                    method: 'PUT'
                }
            });
        }])
    .factory('UpdateUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'update_user/ ', {}, {
                update: {
                    method: 'PUT'
                }
            });
        }])
    .factory('ChangePassword', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'change_password/ ', {}, {
                post: {
                    method: 'POST'
                }
            });
        }])
    //Сервис для входа пользователя
    .factory('LoginUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'login/ ', {}, {
                post: {
                    method: 'POST'
                }
            });
        }])
    //Сервис для выхода
    .factory('LogoutUser', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'logout/ ', {}, {
                get: {
                    method: 'GET'
                }
            });
        }])
    //Изменение аватара
    .factory('ChangeAvatar', ['$resource', 'Constants',
        function ($resource, Constants) {
            return $resource(Constants.apiUrl + 'change_avatar/ ', {}, {
                post: {
                    method: 'POST',
                    transformRequest: function (data) {
                        if (data === undefined)
                            return data;

                        var fd = new FormData();
                        angular.forEach(data, function (value, key) {
                            if (value instanceof FileList) {
                                if (value.length == 1) {
                                    fd.append(key, value[0]);
                                } else {
                                    angular.forEach(value, function (file, index) {
                                        fd.append(key + '_' + index, file);
                                    });
                                }
                            } else {
                                fd.append(key, value);
                            }
                        });

                        return fd;
                    },
                    headers: {'Content-Type': undefined}
                }
            });
        }]);