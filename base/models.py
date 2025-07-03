from django.db import models

# Create your models here.
class Project(models.Model):
    STATUS_CHOICES = [
        ('finished', 'Finished'),
        ('not_finished', 'Not Finished'),
    ]

    CATEGORY_CHOICES = [
        ('desktop', 'Desktop App'),
        ('web', 'Web App'),
        ('mobile', 'Mobile App'),
        # Add more if needed
    ]

    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, null=True, blank=True)  # e.g. "Photo editing app"
    tech_stack = models.CharField(max_length=200)  # e.g. "C++, QT"
    thumbnail = models.ImageField(upload_to='project_thumbnails/')
    download_link = models.FileField(upload_to='project_files/', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.title


class Technical(models.Model):
    CATEGORY_CHOICES = [
        ('programming', 'Programming Languages'),
        ('framework', 'Frameworks & Libraries'),
        ('database', 'Databases'),
        ('other', 'Others'),
    ]

    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    image = models.ImageField(upload_to='technical_skills/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

    def get_category_display(self):
        return dict(self.CATEGORY_CHOICES)[self.category]

    class Meta:
        ordering = ['category', 'title']