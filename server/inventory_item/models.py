from django.db import models


class Item(models.Model):
    _id = models.AutoField(primary_key=True)
    Location = models.CharField(max_length=256)
    Plant = models.BooleanField(default=False)
    Zone = models.CharField(max_length=256)
    Aisle = models.IntegerField()
    Part_Number = models.CharField(max_length=256)
    Part_Description = models.CharField(max_length=256)
    Serial_Number = models.CharField(max_length=256)
    Condition = models.CharField(max_length=256)
    Category = models.CharField(max_length=256)
    Owner = models.CharField(max_length=256)
    Criticality = models.CharField(max_length=256)
    Average_Cost = models.CharField(max_length=256)
    Quantity = models.IntegerField()
    Unit_of_Measure = models.CharField(max_length=256)
