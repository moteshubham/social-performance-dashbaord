from django.db import models

class Brand(models.Model):
    PLATFORM_CHOICES = [
        ('github', 'GitHub'),
        ('youtube', 'YouTube'),
        ('instagram', 'Instagram'),
    ]

    name = models.CharField(max_length=150)
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES, default='github')
    handle = models.CharField(max_length=150, unique=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    last_followers = models.IntegerField(null=True, blank=True)
    last_public_repos = models.IntegerField(null=True, blank=True)
    last_fetched_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.handle})"