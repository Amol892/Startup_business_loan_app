# Generated by Django 4.2.4 on 2023-08-10 07:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('loan_sanctioning', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Installment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('remaining_amount', models.FloatField(blank=True, default=0.0)),
                ('installment_number', models.IntegerField(blank=True, default=0)),
                ('monthly_installment_number', models.FloatField(blank=True, default=0.0)),
                ('installment_expected_date', models.DateField(blank=True, default='2000-12-2')),
                ('installment_paid_date', models.DateField(blank=True, default='2000-12-2')),
                ('penalty_amount', models.FloatField(blank=True, default=0.0)),
                ('status', models.CharField(blank=True, choices=[('', ''), ('ok', 'ok'), ('pending', 'pending'), ('late', 'Late')], default='pending', max_length=50, verbose_name='Status of the installment')),
                ('loan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='installments', to='loan_sanctioning.loan')),
            ],
        ),
        migrations.CreateModel(
            name='Disbursement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('insurance_doc', models.FileField(blank=True, default=0, upload_to='customer/disbusement')),
                ('payment_mode', models.CharField(choices=[('', ''), ('neft', 'NEFT'), ('rtgs', 'RTGS'), ('imps', 'IMPS')], default=0, max_length=50)),
                ('net_disbursed_amount', models.FloatField(blank=True, default=0)),
                ('disbursed_to_account_no', models.CharField(blank=True, default=0, max_length=30)),
                ('receipt_doc', models.FileField(blank=True, default=0, upload_to='customer/disbursement')),
                ('status', models.CharField(blank=True, choices=[('', ''), ('pending', 'pending'), ('disbursed', 'disbursed')], default=0, max_length=250)),
                ('response_timestamp', models.DateTimeField(auto_now=True)),
                ('loan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='disbursements', to='loan_sanctioning.loan')),
            ],
        ),
        migrations.CreateModel(
            name='Defaulter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('default_amount', models.FloatField(blank=True, default=0)),
                ('pending_since_date', models.DateField(blank=True, default='2000-12-2')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='defaulters', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
