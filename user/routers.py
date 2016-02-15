# coding=utf-8
from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from user import router_serializers
from user.models import User


class UserRouter(ModelRouter):
    """Router для коллег."""
    valid_verbs = ['subscribe', 'get_list']
    route_name = 'user'
    serializer_class = router_serializers.UserRouterSerializer
    model = User

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'],
                                      boards__id__in=self.connection.user.boards.all().values_list("id", flat=True))

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(boards__members__id=self.connection.user.id).exclude(
            id=self.connection.user.id).distinct()

    def get_subscription_contexts(self, **kwargs):
        return {'boards__members__id': self.connection.user.id}


route_handler.register(UserRouter)