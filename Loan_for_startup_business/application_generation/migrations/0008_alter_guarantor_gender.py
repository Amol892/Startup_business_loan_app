# Generated by Django 4.2.4 on 2023-08-11 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application_generation', '0007_rename_chetan_application_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guarantor',
            name='gender',
            field=models.CharField(blank=True, choices=[('', ''), ('Male', 'Male'), ('Female', 'Female'), ('Transgender', 'Transgender')], default=0, max_length=50),
        ),
    ]
