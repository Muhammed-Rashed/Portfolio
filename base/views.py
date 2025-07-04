from django.shortcuts import render
from .models import Project
from .models import Technical


# Create your views here.
def index_view(request):
    projects = Project.objects.all()
    technicals = Technical.objects.all()

    grouped_categories = [
        ('software', 'Software Projects'),
        ('web', 'Web Projects'),
        ('game', 'Game Projects'),
    ]

    return render(request, 'base/index.html', {
        'projects': projects,
        'technicals': technicals,
        'grouped_categories': grouped_categories,
    })

