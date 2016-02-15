# coding=utf-8
from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter

from card import router_serializers
from card.models import Card


class CardRouter(ModelRouter):
    """Router для карточек. Возвращаются те которые принадлежат колонкам данной доски. Дополнительно
    проверяется присутствие пользователя в списке работников доски"""
    valid_verbs = ['subscribe', 'get_list']
    route_name = 'card'
    serializer_class = router_serializers.CardRouterSerializer
    model = Card

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(column__board__id=kwargs['column__board__id'],
                                         column__board__members__id=self.connection.user.id)

    def get_subscription_contexts(self, **kwargs):
        return {'column__board__id': kwargs['column__board__id'], 'column__board__members__id': self.connection.user.id}


route_handler.register(CardRouter)