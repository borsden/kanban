from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from board import router_serializers
from board.models import Board


class CurrentBoardRouter(ModelRouter):
    route_name = 'current_board'
    serializer_class = router_serializers.BoardRouterSerializer
    model = Board

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(**kwargs)

# class BoardRouter(ModelRouter):
#     route_name = 'board'
#     serializer_class = router_serializers.BoardRouterSerializer
#     model = Board
#
#     def get_object(self, **kwargs):
#         return self.model.objects.get(pk=kwargs['id'])
#
#     def get_query_set(self, **kwargs):
#         return self.model.objects.filter(**kwargs)

route_handler.register(CurrentBoardRouter)
# route_handler.register(BoardRouter)