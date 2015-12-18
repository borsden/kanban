from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from board import router_serializers
from board.models import Board


class BoardRouter(ModelRouter):
    route_name = 'board'
    serializer_class = router_serializers.BoardRouterSerializer
    model = Board

    def get_object(self, **kwargs):
        return self.model.objects.get(members__id=self.connection.user.pk, pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(members__id=self.connection.user.pk, **kwargs)


route_handler.register(BoardRouter)