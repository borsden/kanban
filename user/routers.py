from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from user import router_serializers
from user.models import User


class UserRouter(ModelRouter):
    route_name = 'user'
    serializer_class = router_serializers.UserRouterSerializer
    model = User

    def get_object(self, **kwargs):
        return self.model.objects.get(colleagues__id=self.connection.user.pk, pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(colleagues__id=self.connection.user.pk, **kwargs)


route_handler.register(UserRouter)