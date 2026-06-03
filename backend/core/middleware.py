import os
import jwt
from django.http import JsonResponse

class SupabaseJWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization required'}, status=401)

        token = auth_header.split(' ', 1)[1]
        secret = os.getenv('SUPABASE_JWT_SECRET', '')

        try:
            payload = jwt.decode(token, secret, algorithms=['HS256'])
            request.jwt_payload = payload
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        return self.get_response(request)