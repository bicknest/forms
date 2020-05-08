import graphene
from graphene_django.types import DjangoObjectType
from django import forms
from graphene_django.forms.mutation import DjangoModelFormMutation

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


class ProfileForm(forms.ModelForm):
    class Meta:
        model = core.models.Profile
        fields = ['name', 'age', 'phone_number', 'business']


class UpdateProfile(DjangoModelFormMutation):
    class Meta:
        form_class = ProfileForm


class Mutation(graphene.ObjectType):
    update_profile = UpdateProfile.Field()
