from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.utils import timezone
from .models import Brand
from .serializers import BrandSerializer
import requests
import os


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by("-id")
    serializer_class = BrandSerializer

    @action(detail=True, methods=["GET"])
    def fetch_metrics(self, request, pk=None):
        brand = self.get_object() #type: ignore
        resp = fetch_external_metrics_for_brand(brand)
        if "error" in resp:
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)
        brand.last_followers = resp.get("followers")
        brand.last_public_repos = resp.get("public_repos")
        brand.last_fetched_at = timezone.now()
        brand.save(
            update_fields=["last_followers", "last_public_repos", "last_fetched_at"]
        )
        return Response(resp)


@api_view(["GET"])
def fetch_metrics_by_handle(request, handle: str):
    url = f"https://api.github.com/users/{handle}"
    try:
        r = requests.get(url, timeout=10)
    except requests.RequestException:
        return Response(
            {"error": "external request failed"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    if r.status_code != 200:
        return Response(
            {
                "error": "user not found or external API error",
                "status_code": r.status_code,
            },
            status=r.status_code,
        )
    data = r.json()
    payload = {
        "login": data.get("login"),
        "name": data.get("name"),
        "avatar_url": data.get("avatar_url"),
        "followers": data.get("followers"),
        "public_repos": data.get("public_repos"),
        "following": data.get("following"),
        "html_url": data.get("html_url"),
        "created_at": data.get("created_at"),
    }
    return Response(payload)


def fetch_external_metrics_for_brand(brand: Brand):

    # Prepare GitHub headers with optional token
    headers = {}
    token = os.getenv("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"token {token}"

    if brand.platform.lower() == "github":
        url = f"https://api.github.com/users/{brand.handle}"
        try:
            r = requests.get(url, headers=headers, timeout=10)
        except requests.RequestException:
            return {"error": "external request failed"}
        if r.status_code != 200:
            return {"error": "user not found", "status_code": r.status_code}
        data = r.json()
        return {
            "login": data.get("login"),
            "followers": data.get("followers"),
            "public_repos": data.get("public_repos"),
            "following": data.get("following"),
            "html_url": data.get("html_url"),
        }
    return {"error": "unsupported platform"}

