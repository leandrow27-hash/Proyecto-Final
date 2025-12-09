# Backend Portal Turístico

## Requisitos
- Docker & docker-compose  (recomendado)
- o Python 3.10+, MySQL local

## Ejecutar con Docker
1. Copiar `.env.example` a `.env` y completar variables.
2. En carpeta `backend/`:
   docker-compose up --build

La API quedará en http://localhost:5000

## Ejecutar local sin Docker
1. Crear virtualenv, instalar `pip install -r requirements.txt`
2. Crear base de datos MySQL `turismo`
3. Exportar variables de entorno (o copiar .env)
4. python app.py

## Endpoints importantes
- POST /auth/register
- POST /auth/login
- GET /api/products
- POST /api/orders  (Authorization: Bearer <token>)
- POST /payments/create-session  {pedido_id}
- POST /payments/webhook/stripe  (Stripe webhook)

## Notas
- Completar STRIPE_WEBHOOK_SECRET y guardar mapping session->pedido está implementado.
- Protege rutas admin en producción (añadir roles).
- Recomendado: usar HTTPS en producción y guardar secretos seguros.
