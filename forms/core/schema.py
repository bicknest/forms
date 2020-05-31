import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_relay import from_global_id
from django import forms
import django_filters
from graphene_django.forms.mutation import DjangoModelFormMutation

import core.models


class ProfileFilter(django_filters.FilterSet):
    pk = django_filters.NumberFilter('id')

    class Meta:
        model = core.models.Profile
        exclude = ['id']


class Profile(DjangoObjectType):
    class Meta:
        model = core.models.Profile
        interfaces = (graphene.relay.Node,)
        filterset_class = ProfileFilter


class BusinessFilter(django_filters.FilterSet):
    pk = django_filters.NumberFilter('id')

    class Meta:
        model = core.models.Business
        exclude = ['id']


class Business(DjangoObjectType):
    class Meta:
        model = core.models.Business
        interfaces = (graphene.relay.Node,)
        filterset_class = BusinessFilter


class Query(object):
    profile = graphene.Field(Profile, id=graphene.ID(required=False), pk=graphene.Int(required=False))
    all_profiles = DjangoFilterConnectionField(Profile)

    business = graphene.Field(Business, id=graphene.ID(required=False), pk=graphene.Int(required=False))
    node = graphene.relay.Node.Field()

    def resolve_profile(self, info, **kwargs):
        id = kwargs.get('id')
        pk = kwargs.get('pk')
        if id is not None:
            _, pk = from_global_id(id)
            return core.models.Profile.objects.get(id=pk)
        if pk is not None:
            return core.models.Profile.objects.get(id=pk)

    def resolve_business(self, info, **kwargs):
        id = kwargs.get('id')
        pk = kwargs.get('pk')
        if id is not None:
            _, pk = from_global_id(id)
            return core.models.Business.objects.get(id=pk)
        if pk is not None:
            return core.models.Business.objects.get(id=pk)


class ProfileForm(forms.ModelForm):
    class Meta:
        model = core.models.Profile
        fields = ['name', 'age', 'phone_number', 'business']


class UpdateProfile(DjangoModelFormMutation):
    class Meta:
        form_class = ProfileForm


class Mutation(graphene.ObjectType):
    update_profile = UpdateProfile.Field()
