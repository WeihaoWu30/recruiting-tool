from django.db import models

# Create your models here.

class Campaign(models.Model):
   TONE_CHOICES = [
      ('Professional', 'Professional'),
      ('Friendly', 'Friendly'),
      ('Formal', 'Formal'),
   ]
   role = models.ForeignKey('roles.Role', on_delete=models.SET_NULL, null=True, blank=True)
   target_skills = models.JSONField(default=list, blank=True)
   target_location = models.CharField(max_length=200, blank=True)
   experience_min = models.CharField(max_length=300, blank=True)
   message_tone = models.CharField(max_length=25, choices=TONE_CHOICES, default='Professional')
   updated_at = models.DateTimeField(auto_now=True)

   def __str__(self):
      return f"{self.role} - {self.message_tone}"