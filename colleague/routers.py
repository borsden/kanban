# coding=utf-8
from swampdragon import route_handler
from swampdragon.pubsub_providers.model_channel_builder import filter_channels_by_model
from swampdragon.route_handler import ModelRouter, publisher
from colleague import router_serializers
from colleague.models import Invitation


class FollowerRouter(ModelRouter):
    """Router для приглашений, отправленных нам"""
    valid_verbs = ['subscribe', 'get_list']
    route_name = 'follower'
    serializer_class = router_serializers.InvitationRouterSerializer
    model = Invitation

    def get_object(self, **kwargs):
        return self.model.objects.get(email=self.connection.user.email, pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(email=self.connection.user.email)

    # Указываем, что доступ имеется только к приглашениям, отправленным нам
    def get_subscription_contexts(self, **kwargs):
        return {'email': self.connection.user.email}


class InvitedMemberRouter(ModelRouter):
    """Router для наших приглашений"""
    valid_verbs = ['subscribe', 'get_list']
    route_name = 'invited_member'
    serializer_class = router_serializers.InvitationRouterSerializer
    model = Invitation

    def get_object(self, **kwargs):
        return self.model.objects.get(user=self.connection.user, pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(user__id=self.connection.user.id)

    # Отбираем только созданные нами приглашения
    def get_subscription_contexts(self, **kwargs):
        return {'user__id': self.connection.user.id}


route_handler.register(FollowerRouter)
route_handler.register(InvitedMemberRouter)