from django.urls import path
from .views import getProducts, getProduct, getCategories, getCategory, getProductsByCategory

urlpatterns = [
    path('products/', getProducts, name='get-products'),
    path('products/<int:id>/', getProduct, name='get-product'),
    path('categories/', getCategories, name='get-categories'),
    path('categories/<int:id>/', getCategory, name='get-category'),
    path('categories/<int:category_id>/products/',
         getProductsByCategory, name='get-products-by-category'),
]