from dataclasses import fields
from rest_framework import serializers
from .models import Brand

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'
        read_only_fields = ('id, created_at', 'last_fetched_at', 'last_followers', 'last_public_repos')