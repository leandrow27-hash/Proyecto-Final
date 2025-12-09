# Proyecto - Entrega Final (Documentación actualizada)

Esta copia complementa `README.md` con instrucciones actualizadas para desarrollo, tests y despliegue.

## Resumen rápido
- Levantar con Docker: `docker compose up --build`
- Frontend dev: `http://localhost:5173`
- Backend API: `http://localhost:5000` (rutas bajo `/api/`)
- Tests backend: `pytest tests/backend`
- Build frontend: `cd frontend && npm run build`

## Comandos útiles

### Levantar stack (modo desarrollo)
```powershell
docker compose up --build
```

### Ejecutar tests backend (con Docker reproducible)
```powershell
docker run --rm -v ${PWD}:/src -w /src python:3.11-slim sh -c "pip install --no-cache-dir -r backend/requirements-dev.txt && pytest tests/backend -q"
```

### Ejecutar build frontend
```powershell
cd frontend
npm ci
npm run build
```

### Cambiar remoto a SSH y empujar (recomendado)
```powershell
git remote set-url origin git@github.com:leandrow27-hash/Proyecto-Final.git
git push -u origin HEAD
```

## Notas de CI
El workflow en `.github/workflows/ci.yml` ejecuta los tests de backend y el `npm test` + `npm run build` del frontend en cada push/PR contra `main`/`master`.

## Qué queda por hacer (prioridad)
1. Ejecutar y solucionar fallos en tests backend.
2. Ejecutar `npm run build` y comprobar `frontend/dist`.
3. Ejecutar integración completa con `docker compose up --build` y validar endpoints.
4. Push final al remoto (SSH preferible).

Si quieres que ejecute alguno de los pasos automáticamente desde aquí, pega la salida de los comandos que ejecutes en tu máquina o indícame permiso para guiarte paso a paso.
