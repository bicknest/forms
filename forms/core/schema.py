import graphene
from graphene_django.types import DjangoObjectType

import core.models


class Profile(DjangoObjectType):
    class Meta:
        model = core.models.Profile
        interfaces = (graphene.relay.Node,)


class Business(DjangoObjectType):
    class Meta:
        model = core.models.Business
        interfaces = (graphene.relay.Node,)


class Query(object):
    profile = graphene.Field(Profile, id=graphene.ID(required=False), pk=graphene.Int(required=False))

    business = graphene.Field(Business, id=graphene.ID(required=False), pk=graphene.Int(required=False))
    node = graphene.relay.Node.Field()
