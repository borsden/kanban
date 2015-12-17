from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from card import router_serializers
from card.models import Card


class CardRouter(ModelRouter):
    route_name = 'card'
    serializer_class = router_serializers.CardRouterSerializer
    model = Card

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(**kwargs)


route_handler.register(CardRouter)