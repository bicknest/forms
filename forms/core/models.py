from django.db import models


class Business(models.Model):
    NORTH_AMERICA = "North America"
    ASIA = "Asia"
    AFRICA = "Africa"
    SOUTH_AMERICA = "South America"
    AUSTRALIA = "Australia"
    LOCATION_CHOICES = (
        (NORTH_AMERICA, NORTH_AMERICA),
        (ASIA, ASIA),
        (SOUTH_AMERICA, SOUTH_AMERICA),
        (AFRICA, AFRICA),
        (AUSTRALIA, AUSTRALIA),
    )

    name = models.CharField(blank=True, default="", max_length=255)
    location = models.CharField(choices=LOCATION_CHOICES, blank=True, default="", max_length=255)
    address_line_one = models.CharField(blank=True, default="", max_length=255)
    address_line_two = models.CharField(blank=True, default="", max_length=255)


class Profile(models.Model):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"
    GENDER_CHOICES = (
        (MALE, MALE),
        (FEMALE, FEMALE),
        (OTHER, OTHER),
    )
    name = models.CharField(blank=True, default="", max_length=255)
    age = models.PositiveSmallIntegerField(null=True)
    phone_number = models.CharField(max_length=20)
    gender = models.CharField(choices=GENDER_CHOICES, blank=True, default="", max_length=255)
    business = models.ForeignKey(Business, models.SET_NULL, null=True)


class Reference(models.Model):
    name = models.CharField(blank=True, default="", max_length=255)
    relation = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)


class ProfileReview(models.Model):
    profile = models.OneToOneField(Profile, models.CASCADE, null=True, related_name="review")
    comments = models.CharField(blank=True, default="", max_length=255)
    profile_verified = models.BooleanField(default=False)
    phone_verified = models.BooleanField(default=False)
    reviewed_at = models.DateField()
