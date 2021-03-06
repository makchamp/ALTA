from rest_framework import serializers
from inventory_item.serializers import ItemSerializer
from user_account.serializers import UserAuditSerializer
from .models import Audit, ItemToSK


class AuditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Audit
        fields = '__all__'


class GetAuditSerializer(serializers.ModelSerializer):
    inventory_items = ItemSerializer(read_only=True, many=True)
    assigned_sk = UserAuditSerializer(read_only=True, many=True)

    class Meta:
        model = Audit
        fields = '__all__'


class ItemToSKSerializer(serializers.ModelSerializer):
    audit = AuditSerializer(read_only=True, many=True)

    class Meta:
        model = ItemToSK
        fields = '__all__'
