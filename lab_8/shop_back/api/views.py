from django.http import JsonResponse
from .models import Product
from .models import Category


def getProducts(request):
    products = list(Product.objects.values())
    return JsonResponse({'products': products}, safe=False)


def getProduct(request, id):
    try:
        product = Product.objects.get(id=id)
        return JsonResponse({
            'id': product.id,  # type: ignore
            'name': product.name,
            'price': product.price,
            'description': product.description,
            'count': product.count,
            'is_active': product.is_active,
            'category': product.category.name
        }, safe=False)
    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)


def getCategories(request):
    categories = list(Category.objects.values())
    return JsonResponse({'categories': categories}, safe=False)


def getCategory(request, id):
    try:
        category = Category.objects.get(id=id)
        return JsonResponse({
            'id': category.id,  # type: ignore
            'name': category.name,
        }, safe=False)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=404)


def getProductsByCategory(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
        products = list(Product.objects.filter(category=category).values())
        return JsonResponse({'products': products}, safe=False)
    except Category.DoesNotExist:
        return JsonResponse({'error': 'Category not found'}, status=404)
