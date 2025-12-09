# Proyecto - Entrega Final (parches generados)


## Pasos para levantar local con Docker


1. Copiar `.env.example` a `.env` y completar claves (DATABASE_URL, STRIPE_*, SMTP_*).
2. Ejecutar `docker compose up --build` desde la raíz.
3. Inicializar DB y seeds:
- `docker compose exec backend python seed.py`
4. Acceder a frontend: http://localhost:3000


## Tests
- backend: pytest
- frontend: vitest / playwright (scaffold)