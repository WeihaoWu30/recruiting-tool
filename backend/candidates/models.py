from django.db import models

# Create your models here.

class Candidate(models.Model):
   name = models.CharField(max_length=200)
   STATUS_CHOICES = [
      ('Contacted', 'Contacted'),
      ('Replied', 'Replied'),
      ('Interviewing', 'Interviewing'),
      ('Hired', 'Hired') 
   ]
   headline = models.CharField(max_length=300, blank=True)
   location = models.CharField(max_length=200, blank=True)
   linkedin_url = models.URLField(unique=True)
   skills = models.JSONField(default=list)
   experiences = models.JSONField(default=list, blank=True)
   match_score = models.IntegerField(default=0)
   outreach_message = models.TextField(blank=True)
   status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Contacted')
   roles = models.ManyToManyField('roles.Role', blank=True)
   created_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
      return self.name