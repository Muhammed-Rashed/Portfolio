from django.db import models

# Create your models here.
class Project(models.Model):
    STATUS_CHOICES = [
        ('finished', 'Finished'),
        ('not_finished', 'Not Finished'),
    ]

    CATEGORY_CHOICES = [
        ('software', 'Software'),
        ('web', 'Web'),
        ('game', 'Game'),
        # Add more if needed
    ]

    LINK_TYPE_CHOICES = [
        ('download', 'Download File'),
        ('github', 'View on GitHub'),
        ('website', 'Visit Website'),
        ('none', 'Not Available'),
    ]

    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    tech_stack = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to='project_thumbnails/')

    link_type = models.CharField(max_length=20, choices=LINK_TYPE_CHOICES, default='none')
    download_link = models.FileField(upload_to='project_files/', null=True, blank=True)
    link_url = models.URLField(null=True, blank=True)  # for GitHub or website links

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