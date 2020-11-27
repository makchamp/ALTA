# Generated by Django 3.0.5 on 2020-11-27 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('_id', models.AutoField(primary_key=True, serialize=False)),
                ('Location', models.CharField(max_length=256)),
                ('Plant', models.BooleanField(default=False)),
                ('Zone', models.CharField(max_length=256)),
                ('Aisle', models.IntegerField()),
                ('Part_Number', models.CharField(max_length=256)),
                ('Part_Description', models.CharField(max_length=256)),
                ('Serial_Number', models.CharField(max_length=256)),
                ('Condition', models.CharField(max_length=256)),
                ('Category', models.CharField(max_length=256)),
                ('Owner', models.CharField(max_length=256)),
                ('Criticality', models.CharField(max_length=256)),
                ('Average_Cost', models.CharField(max_length=256)),
                ('Quantity', models.IntegerField()),
                ('Unit_of_Measure', models.CharField(max_length=256)),
            ],
        ),
    ]
