from datetime import date

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from user_account.permissions import IsSystemAdmin
from .permissions import IsInventoryManagerTemplate
from .serializers import AuditTemplateSerializer
from .models import AuditTemplate


class AuditTemplateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Audit templates to be viewed or created.
    """

    queryset = AuditTemplate.objects.all()
    serializer_class = AuditTemplateSerializer
    permission_classes = [IsAuthenticated, IsInventoryManagerTemplate | IsSystemAdmin]
    http_method_names = ['post', 'get', 'patch', 'delete']

    def create(self, request, *args, **kwargs):
        data = request.data
        user = request.user
        name = user.first_name + " " + user.last_name
        today = date.today()
        date_today = today.strftime("%B %d, %Y")
        data['author'] = name
        data['calendar_date'] = date_today
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset()).filter(
                organization_id=self.request.GET.get("organization", ''))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
