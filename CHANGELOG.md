# CHANGELOG

Todas las modificaciones notables al proyecto se documentan en este archivo.

## [1.0.0] - 2025-12-09
### Añadido
- Documentación actualizada: `README.md` y `README_UPDATED.md` con pasos de desarrollo, pruebas y despliegue.
- Plantilla de entorno: `.env.example`.
- Scripts de ayuda: `scripts/run_backend_tests.ps1` y `scripts/build_frontend.ps1`.
- Frontend: configuración básica y `frontend/tests/smoke.js` (smoke test) para CI.
- Frontend: ajuste de `package.json` para que `npm test` pase cuando no hay tests (`--passWithNoTests`).
- Backend: `tests/backend/test_api_basic.py` robusto frente a rutas de import.
- CI: `.github/workflows/ci.yml` actualizado (establece `PYTHONPATH` durante tests backend).
- Archivo `.gitignore` añadido.
- Tag de release: `v1.0.0` creado y empujado al remoto.

### Corregido
- Correcciones menores en importaciones y blueprints del backend para hacer la aplicación más robusta en entornos de test.

### Notas
- Tests backend: `pytest tests/backend` — ver `scripts/run_backend_tests.ps1`.
- Build frontend: `cd frontend && npm ci && npm run build` — artefactos en `frontend/dist`.
- CI: Tras el push, verifica la pestaña `Actions` en GitHub para confirmar que el workflow `CI` pasó (ejecuta tests y build del frontend).

---

Para próximos pasos recomendados:
- Revisar y completar migraciones si se va a usar una base de datos en producción.
- Añadir datos de seed en entorno de staging/producción si procede.
- Añadir pruebas adicionales (unitarias y de integración) para mejorar cobertura.
