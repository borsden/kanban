# coding=utf-8
from django.core.exceptions import ObjectDoesNotExist
from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
import time
from board import router_serializers
from board.models import Board


class BoardRouter(ModelRouter):
    """Router для досок. Возвращаются те доски, которые принадлежат данному пользователю."""
    # Доступные действия: получение списка доска и получение одной доски
    valid_verbs = ['subscribe', 'get_list', 'get_single']
    route_name = 'board'
    serializer_class = router_serializers.BoardRouterSerializer
    model = Board

    def get_object(self, **kwargs):
        try:
            return self.model.objects.get(members__id=self.connection.user.pk, pk=kwargs['id'])
        except ObjectDoesNotExist:
            self.send_error(u'К сожалению, у вас нет доступа к этой доске.')

    def get_query_set(self, **kwargs):
        # time.sleep(5)
        return self.model.objects.filter(members__id=self.connection.user.pk, **kwargs)

    # Указываем, что доступ имеется только к тем доскам, в которых мы участвуем
    def get_subscription_contexts(self, **kwargs):
        return {'members__id': self.connection.user.pk}


route_handler.register(BoardRouter)