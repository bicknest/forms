import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
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


class ProfileForm(forms.ModelForm):
    class Meta:
        model = core.models.Profile
        fields = ['name', 'age', 'phone_number', 'business']


class UpdateProfile(DjangoModelFormMutation):
    class Meta:
        form_class = ProfileForm


class Mutation(graphene.ObjectType):
    update_profile = UpdateProfile.Field()
