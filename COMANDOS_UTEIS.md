# 🛠️ COMANDOS ÚTEIS - Otimização e Build

## 📦 Build e Desenvolvimento

### Build de Produção
```bash
npm run build
```

### Build com Análise de Bundle (PowerShell)
```powershell
$env:ANALYZE="true"; npm run build
```

### Build com Análise de Bundle (CMD)
```cmd
set ANALYZE=true && npm run build
```

### Desenvolvimento
```bash
npm run dev
```

### Produção Local
```bash
npm run build
npm run start
```

---

## 🔍 Análise e Debugging

### Ver Tamanho dos Bundles
```powershell
npm run build
Get-ChildItem .next/static -Recurse | Measure-Object -Property Length -Sum
```

### Análise Detalhada de Bundle
```powershell
$env:ANALYZE="true"; npm run build
# Abre automaticamente no navegador: .next/analyze/client.html
```

### Verificar Pacotes Instalados
```bash
npm list --depth=0
```

### Verificar Pacotes Desatualizados
```bash
npm outdated
```

---

## 🧹 Limpeza

### Limpar Cache do Next.js
```powershell
Remove-Item -Recurse -Force .next
npm run build
```

### Limpar node_modules e Reinstalar
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Limpar Tudo
```powershell
Remove-Item -Recurse -Force .next, node_modules
Remove-Item package-lock.json
npm install
npm run build
```

---

## 🔐 Segurança

### Auditoria de Segurança
```bash
npm audit
```

### Corrigir Vulnerabilidades Automáticas
```bash
npm audit fix
```

### Corrigir Vulnerabilidades (Força)
```bash
npm audit fix --force
```

---

## 📊 Lighthouse

### Lighthouse CLI (Global)
```bash
# Instalar
npm install -g @lhci/cli lighthouse

# Executar
lighthouse http://localhost:3000 --view
```

### Lighthouse com Configuração Customizada
```bash
lighthouse http://localhost:3000 \
  --only-categories=performance \
  --output=json \
  --output-path=./lighthouse-report.json
```

---

## 🎯 Análise de Performance

### Verificar Tamanho de Arquivos Específicos
```powershell
# CSS
Get-ChildItem .next/static/**/*.css | Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB,2)}}

# JavaScript
Get-ChildItem .next/static/**/*.js | Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB,2)}}
```

### Top 10 Maiores Arquivos
```powershell
Get-ChildItem .next/static -Recurse -File | 
  Sort-Object Length -Descending | 
  Select-Object -First 10 Name, @{Name="SizeMB";Expression={[math]::Round($_.Length/1MB,2)}}
```

---

## 🌐 Deploy

### Vercel (Recomendado)
```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel

# Deploy de Produção
vercel --prod
```

### Build para Deploy Manual
```bash
npm run build
# Copiar pasta .next/ para servidor
```

---

## 📦 Gerenciamento de Pacotes

### Adicionar Pacote de Desenvolvimento
```bash
npm install --save-dev nome-do-pacote
```

### Remover Pacote
```bash
npm uninstall nome-do-pacote
```

### Atualizar Pacote Específico
```bash
npm update nome-do-pacote
```

### Atualizar Todos os Pacotes
```bash
npm update
```

---

## 🔧 Troubleshooting

### Erro de Cache
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

### Erro de TypeScript
```bash
# Verificar erros
npx tsc --noEmit

# Gerar types
npm run build
```

### Erro de Build
```powershell
# Limpar e reconstruir
Remove-Item -Recurse -Force .next, node_modules
npm install
npm run build
```

### Erro de Memória (Heap)
```bash
# Aumentar memória do Node.js
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## 📈 Monitoramento de Build

### Ver Output Detalhado
```bash
npm run build -- --debug
```

### Build com Informações de Bundle
```bash
npm run build
# Output mostra automaticamente tamanhos
```

### Exportar Análise de Bundle
```powershell
$env:ANALYZE="true"; npm run build
# Gera .next/analyze/client.html e server.html
```

---

## 🎨 Tailwind

### Gerar Configuração Completa
```bash
npx tailwindcss init --full
```

### Verificar Classes Geradas
```bash
# Build CSS e ver output
npm run build
Get-Content .next/static/css/*.css
```

---

## 🧪 Testes de Performance

### Teste de Carga Local
```bash
# Instalar
npm install -g autocannon

# Build e start
npm run build
npm run start

# Em outro terminal
autocannon -c 100 -d 30 http://localhost:3000
```

### Comparar Antes e Depois
```powershell
# Antes
npm run build > build-antes.txt
Get-Content build-antes.txt | Select-String "First Load JS"

# Implementar otimizações

# Depois
npm run build > build-depois.txt
Get-Content build-depois.txt | Select-String "First Load JS"
```

---

## 📝 Git

### Verificar Mudanças
```bash
git status
git diff
```

### Commit de Otimizações
```bash
git add .
git commit -m "feat: implementar otimizações de performance

- Configurar minificação de JS/CSS
- Adicionar bundle analyzer
- Otimizar imports de pacotes
- Habilitar compressão Gzip
- Configurar Tailwind JIT mode"
```

---

## 🚀 Workflow Completo de Otimização

```powershell
# 1. Limpar ambiente
Remove-Item -Recurse -Force .next

# 2. Build inicial para baseline
npm run build > build-antes.txt

# 3. Implementar otimizações
# ... fazer mudanças ...

# 4. Build com análise
$env:ANALYZE="true"; npm run build

# 5. Comparar resultados
Get-Content build-antes.txt | Select-String "First Load JS"
Get-Content build-depois.txt | Select-String "First Load JS"

# 6. Testar localmente
npm run start

# 7. Executar Lighthouse
lighthouse http://localhost:3000 --view

# 8. Commit e deploy
git add .
git commit -m "feat: otimizações de performance"
git push
```

---

## 📊 Benchmark Rápido

```powershell
# Script de benchmark completo
function Benchmark-Build {
    Write-Host "Limpando cache..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
    
    Write-Host "Iniciando build..." -ForegroundColor Yellow
    $buildTime = Measure-Command { npm run build }
    
    Write-Host "`nTempo de build: $($buildTime.TotalSeconds) segundos" -ForegroundColor Green
    
    Write-Host "`nTamanho dos bundles:" -ForegroundColor Cyan
    Get-ChildItem .next/static -Recurse -File | 
        Measure-Object -Property Length -Sum |
        ForEach-Object { "Total: $([math]::Round($_.Sum/1MB,2)) MB" }
}

# Executar
Benchmark-Build
```

---

## 🎯 Quick Commands (Copiar e Colar)

```powershell
# Build + Análise + Relatório
Remove-Item -Recurse -Force .next; $env:ANALYZE="true"; npm run build

# Limpar + Reinstalar + Build
Remove-Item -Recurse -Force .next, node_modules; npm install; npm run build

# Ver Top 5 Maiores Arquivos
Get-ChildItem .next/static -Recurse -File | Sort-Object Length -Descending | Select-Object -First 5 Name, @{Name="KB";Expression={[math]::Round($_.Length/1KB,2)}}

# Build + Start + Lighthouse
npm run build; Start-Process "npm run start"; Start-Sleep 5; lighthouse http://localhost:3000 --view
```

---

## 📚 Referências Rápidas

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm run build:analyze` | Build + análise |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificar código |

---

Salve este arquivo para referência rápida! 🚀
