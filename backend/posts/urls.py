from django.urls import path,include

app_name='posts'
urlpatterns = [
   
    path("v1/", include("posts.api.v1.urls")),
]