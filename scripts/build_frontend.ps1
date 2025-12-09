# Build frontend helper
# Usage: .\scripts\build_frontend.ps1
Set-Location -Path "frontend"
npm ci
npm run build
Write-Output "Frontend build finished. Artifacts: frontend/dist"
