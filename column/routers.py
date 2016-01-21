from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from column.models import Column
from column.router_serializers import ColumnRouterSerializer


class ColumnRouter(ModelRouter):
    route_name = 'column'
    serializer_class = ColumnRouterSerializer
    model = Column

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(**kwargs).order_by('position')

route_handler.register(ColumnRouter)