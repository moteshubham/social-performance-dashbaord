from django.contrib import admin
from .models import Brand

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'handle', 'platform', 'last_followers', 'last_fetched_at')
    search_fields = ('name', 'handle')
    list_filter = ('platform',)