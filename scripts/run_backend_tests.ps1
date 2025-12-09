# Run backend tests (PowerShell helper)
# Usage: .\scripts\run_backend_tests.ps1 [-UseDocker]
param(
    [switch]$UseDocker
)

if ($UseDocker) {
    docker run --rm -v ${PWD}:/src -w /src python:3.11-slim sh -c "pip install --no-cache-dir -r backend/requirements-dev.txt && pytest tests/backend -q"
} else {
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    pip install --upgrade pip
    pip install -r backend/requirements-dev.txt
    pytest tests/backend -q
}
