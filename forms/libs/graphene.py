from django import forms
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphql_relay import from_global_id


class ModelFormMutationRelayID(DjangoModelFormMutation):
    class Meta:
        abstract = True

    @classmethod
    def get_form_kwargs(cls, root, info, **input):
        # convert all Graphene IDs from relay IDs to pks
        kwargs = {"data": input}

        # look for any foreign key or many to many fields and convert from relay id to local pk
        # this is a bit of a hack - a better way might be to inspect `cls.Input` for ID and List(ID)
        # fields and convert those.
        """
        fk_fields = [
            name for name, f in cls._meta.form_class.base_fields.items()
            if isinstance(f, forms.models.ModelChoiceField) and isinstance(input.get(name), str)
        ]

        for name in fk_fields:
            # handle ModelMultipleChoiceFields as well
            if isinstance(input[name], list):
                input[name] = [from_global_id(id)[1] for id in input[name]]
            else:
                _, input[name] = from_global_id(input[name])

        """
        id = input.get("id")
        if id:  # ignore None or empty ids
            _, pk = from_global_id(id)
            instance = cls._meta.model._default_manager.get(pk=pk)
            print(instance)
            kwargs["instance"] = instance

        return kwargs
