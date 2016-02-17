angular
    .module('Kanban')
    .directive('inviteMemberPopover', ['InvitedMember', inviteMemberPopover]);

//Выпадающее меню для приглашения нового пользователя
function inviteMemberPopover(InvitedMember) {
    var directive = {
        templateUrl: 'invite-member-popover.html',
        restrict: 'A',
        link: function (scope, elem, attrs) {
            // В выпадающем меню есть выпадающий список и в случае,
            // если он открыт, а меню закрыто щелчом вне, он остается открытым.


            // Находим список в DOM
            var select_element = angular.element(elem[0].getElementsByClassName('md-select-menu-container__invite-email__boards'));
            // Функция проверки наличия класса в списке классов
            var hasClass = function (element, cls) {
                var classes = element.attr('class');
                return classes.split(' ').indexOf(cls) !== -1;
            };
            // Объект приглашенного пользователя
            scope.invited_member = {email: null, board: null};
            //Если мы добавляем пользователя в текущую доску, то скроем выбор доски
            if (attrs.board) {
                scope.board = attrs.board
            }
            // Проверяем появление класса md-leave в списке классов меню. Его наличие сигнализирует о закрытии меню
            scope.$watch(function () {
                return hasClass(elem.parent(), 'md-leave');
            }, function (value) {
                if (value == true) {
                    // Обнуляем приглашенного пользователя
                    scope.invited_member = {email: null, board: null};
                    // Закрываем список добавлением класса md-leave
                    select_element.addClass('md-leave');
                }
            });
            // Приглашение нового пользователя
            // Todo: зафиксировать ошибки
            scope.inviteMember = function () {
                if (scope.board) {
                    scope.invited_member.board = scope.board
                }
                InvitedMember.post(scope.invited_member, function (result) {
                }, function (error) {
                    if (error.status == 302) {
                        console.log('Данный пользователь уже в списке')
                    }
                    else if (error.status == 303) {
                        console.log('Вы добавляете себя')
                    }
                    else if (error.status == 405) {
                        console.log('Данный пользователь уже состоит в этой доске')
                    }
                    else {
                        console.log('Возникла непредвиденная ошибка')
                    }

                })
            };
        }
    };
    return directive;

}