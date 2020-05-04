from django.db import models

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
    business = models.ForeignKey(Business, models.CASCADE, null=True)
    gender = models.CharField(choices=GENDER_CHOICES, blank=True, default="")


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
    profile = models.ForeignKey(Profile, models.CASCADE, null=True)
    location = models.CharField(choices=LOCATION_CHOICES, blank=True, default="")
    address_line_one = models.CharField(blank=True, default="", max_length=255)
    address_line_two = models.CharField(blank=True, default="", max_length=255)


class Reference(models.Model):
    name = models.CharField(blank=True, default="", max_length=255)
    relation = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)


class ProfileReview(models.Model):
    profile = models.OnetoOneField(Profile, models.CASCADE, null=True, related_name="review")
    comments = models.CharField(blank=True, default="", max_length=255)
    profile_verified = models.Boolean(default=False)
    phone_verified = models.Boolean(default=False)
    reviewed_at = models.DateField()
