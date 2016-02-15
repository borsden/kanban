# coding=utf-8
from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from column.models import Column
from column.router_serializers import ColumnRouterSerializer


class ColumnRouter(ModelRouter):
    """Router для колонок. Возвращаются колонки данной доски. Дополнительно
    проверяется присутствие пользователя в списке работников доски"""
    valid_verbs = ['subscribe', 'get_list']
    route_name = 'column'
    serializer_class = ColumnRouterSerializer
    model = Column

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(board__id=kwargs['board__id'],
                                         board__members__id=self.connection.user.id).order_by('position')

    def get_subscription_contexts(self, **kwargs):
        return {'board__id': kwargs['board__id'], 'board__members__id': self.connection.user.id}


route_handler.register(ColumnRouter)