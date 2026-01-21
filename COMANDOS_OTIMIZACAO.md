# ⚡ Comandos Úteis - Otimização de Recursos Bloqueantes

## 🔍 Análise e Diagnóstico

### Lighthouse via CLI
```powershell
# Instalar Lighthouse globalmente
npm install -g lighthouse

# Executar análise
lighthouse http://localhost:3000 --view --output=html --output-path=./lighthouse-report.html

# Apenas performance
lighthouse http://localhost:3000 --only-categories=performance --view

# Mobile + Desktop
lighthouse http://localhost:3000 --preset=desktop --view
lighthouse http://localhost:3000 --preset=mobile --view
```

### Bundle Analyzer
```powershell
# Análise de bundle
npm run build:analyze

# Ou manualmente
$env:ANALYZE="true"
npm run build

# Windows CMD
set ANALYZE=true && npm run build
```

### Coverage Analysis (via DevTools)
```
1. Abrir DevTools (F12)
2. Ctrl+Shift+P
3. Digitar "Show Coverage"
4. Clicar em "Reload" (círculo)
5. Verificar CSS/JS não utilizado
```

---

## 🧪 Testes de Performance

### Web Vitals no Console
```javascript
// Colar no console do browser
(async () => {
  const { onCLS, onFID, onLCP, onFCP, onTTFB } = await import('https://unpkg.com/web-vitals@3?module');
  
  onCLS(console.log);
  onFID(console.log);
  onLCP(console.log);
  onFCP(console.log);
  onTTFB(console.log);
})();
```

### Network Throttling
```
DevTools > Network > Throttling:
- Fast 3G: Simula conexão móvel
- Slow 3G: Testa performance em rede lenta
- Offline: Testa PWA
```

### Performance Recording
```
1. DevTools > Performance
2. Clicar em Record (círculo)
3. Interagir com a página
4. Parar gravação
5. Analisar Long Tasks (barras vermelhas)
```

---

## 🔧 Build e Deploy

### Build Otimizado
```powershell
# Build normal
npm run build

# Build com análise
npm run build:analyze

# Verificar output
npm run build && ls .next/static/chunks
```

### Start em Produção
```powershell
# Depois do build
npm run start

# Com porta customizada
PORT=3001 npm run start  # Linux/Mac
$env:PORT=3001; npm run start  # PowerShell

# Verificar
curl http://localhost:3000
```

### Verificar Tamanho dos Bundles
```powershell
# PowerShell
Get-ChildItem .next/static -Recurse | Measure-Object -Property Length -Sum

# CMD
dir .next\static /s
```

---

## 🎯 Otimizações Específicas

### Extrair Critical CSS (Manual)
```powershell
# Instalar critical
npm install -D critical

# Criar script
node -e "
const critical = require('critical');
critical.generate({
  base: '.next/',
  src: 'index.html',
  target: 'critical.css',
  width: 1300,
  height: 900
});
"
```

### Analisar Font Loading
```javascript
// Console do browser
document.fonts.ready.then(() => {
  console.log('Fontes carregadas!');
  console.log('Fontes:', Array.from(document.fonts.values()).map(f => f.family));
});
```

### Verificar Resource Hints
```powershell
# Ver HTML gerado
curl http://localhost:3000 | Select-String "preconnect|dns-prefetch|preload|prefetch"
```

---

## 📊 Métricas e Monitoramento

### Capturar Performance Metrics
```javascript
// Console do browser
const perfData = performance.getEntriesByType('navigation')[0];
console.log({
  'DNS': perfData.domainLookupEnd - perfData.domainLookupStart,
  'TCP': perfData.connectEnd - perfData.connectStart,
  'Request': perfData.responseStart - perfData.requestStart,
  'Response': perfData.responseEnd - perfData.responseStart,
  'DOM Parse': perfData.domInteractive - perfData.responseEnd,
  'DOM Complete': perfData.domComplete - perfData.domInteractive
});
```

### Timing API
```javascript
// Medir tempo de execução
performance.mark('inicio');
// ... código ...
performance.mark('fim');
performance.measure('duracao', 'inicio', 'fim');
console.log(performance.getEntriesByName('duracao')[0].duration);
```

---

## 🐛 Debug e Troubleshooting

### Verificar Service Worker
```javascript
// Console do browser
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Service Workers:', registrations);
  registrations.forEach(r => console.log('Scope:', r.scope));
});
```

### Limpar Cache
```powershell
# PowerShell - Limpar build
Remove-Item -Recurse -Force .next

# Rebuild
npm run build
```

### Verificar Headers HTTP
```powershell
# PowerShell
Invoke-WebRequest -Uri http://localhost:3000 -Method HEAD | Select-Object Headers

# Ver Cache-Control
curl -I http://localhost:3000/static/chunk.js
```

### Debug CSS Loading
```javascript
// Console do browser
const sheets = document.styleSheets;
for (let i = 0; i < sheets.length; i++) {
  console.log(`Sheet ${i}:`, sheets[i].href || 'inline', sheets[i].cssRules.length, 'rules');
}
```

---

## 🚀 Automação

### Script de Teste Completo
Criar arquivo `test-performance.ps1`:

```powershell
# Build
Write-Host "🔨 Building..." -ForegroundColor Yellow
npm run build

# Start server em background
Write-Host "🚀 Starting server..." -ForegroundColor Yellow
Start-Process npm -ArgumentList "run", "start" -NoNewWindow

# Aguardar servidor iniciar
Start-Sleep -Seconds 5

# Lighthouse
Write-Host "🔍 Running Lighthouse..." -ForegroundColor Yellow
lighthouse http://localhost:3000 `
  --only-categories=performance `
  --output=html `
  --output-path=./reports/lighthouse-$(Get-Date -Format 'yyyy-MM-dd-HHmm').html `
  --view

Write-Host "✅ Done!" -ForegroundColor Green
```

Executar:
```powershell
.\test-performance.ps1
```

### CI/CD Integration
```yaml
# .github/workflows/performance.yml
name: Performance Check
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: npm run build
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: http://localhost:3000
          budgetPath: ./budget.json
```

---

## 📈 Comparação Before/After

### Criar Relatórios Comparativos
```powershell
# Baseline (antes)
lighthouse http://localhost:3000 --output=json --output-path=baseline.json

# Fazer otimizações...

# Depois
lighthouse http://localhost:3000 --output=json --output-path=optimized.json

# Comparar (precisa de ferramenta externa)
# https://googlechrome.github.io/lighthouse/viewer/
```

---

## 🔬 Ferramentas Avançadas

### WebPageTest
```
1. Acessar https://www.webpagetest.org/
2. URL: http://seu-site.com
3. Test Location: São Paulo, Brazil
4. Browser: Chrome
5. Connection: 3G Fast
6. Click "Start Test"
```

### Chrome User Experience Report
```powershell
# Instalar CrUX API CLI
npm install -g crux

# Consultar métricas
crux https://seu-site.com
```

### PageSpeed Insights API
```powershell
# PowerShell
$url = "http://localhost:3000"
$apiKey = "SUA_API_KEY"
Invoke-RestMethod -Uri "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=$url&key=$apiKey"
```

---

## 💡 Dicas Rápidas

### Verificar se CSS está inline
```powershell
curl http://localhost:3000 | Select-String "<style>" -Context 0,5
```

### Ver tamanho de fontes
```powershell
Get-ChildItem public/fonts | Measure-Object -Property Length -Sum | Select-Object @{Name="SizeKB";Expression={$_.Sum/1KB}}
```

### Limpar cache do browser (DevTools)
```
Ctrl+Shift+Del
OU
DevTools > Application > Clear Storage > Clear site data
```

### Forçar recarga sem cache
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

---

## 📋 Checklist Rápido

```powershell
# Executar todos os testes
function Test-Performance {
  Write-Host "1️⃣ Building..." -ForegroundColor Cyan
  npm run build
  
  Write-Host "2️⃣ Analyzing bundle..." -ForegroundColor Cyan
  $env:ANALYZE="true"; npm run build
  
  Write-Host "3️⃣ Starting server..." -ForegroundColor Cyan
  Start-Process npm -ArgumentList "run", "start"
  Start-Sleep 5
  
  Write-Host "4️⃣ Running Lighthouse..." -ForegroundColor Cyan
  lighthouse http://localhost:3000 --view
  
  Write-Host "✅ Complete!" -ForegroundColor Green
}

# Executar
Test-Performance
```

---

## 🎓 Recursos de Aprendizado

### Documentação Oficial
- Next.js Performance: https://nextjs.org/docs/app/building-your-application/optimizing
- Web.dev Learn: https://web.dev/learn/
- Chrome DevTools: https://developer.chrome.com/docs/devtools/

### Ferramentas Online
- Lighthouse: https://pagespeed.web.dev/
- Bundle Analyzer: https://bundlephobia.com/
- Can I Use: https://caniuse.com/

### Comunidades
- Next.js Discord: https://nextjs.org/discord
- Web Performance Slack: https://webperformance.slack.com/

---

## 🆘 Comandos de Emergência

### Se algo der errado
```powershell
# Limpar tudo
Remove-Item -Recurse -Force .next, node_modules
npm install
npm run build

# Resetar git (cuidado!)
git reset --hard HEAD
git clean -fd

# Verificar integridade
npm audit
npm audit fix
```

### Rollback de otimizações
```powershell
# Ver commits recentes
git log --oneline -10

# Reverter para commit anterior
git revert HEAD

# Ou resetar
git reset --hard <commit-hash>
```

---

## 🎯 Meta de Performance

```
✅ Performance Score: > 90
✅ FCP: < 1.8s
✅ LCP: < 2.5s
✅ TBT: < 300ms
✅ CLS: < 0.1
✅ Bundle Size: < 200KB
✅ CSS Unused: < 20%
✅ JS Unused: < 30%
```

Executar regularmente para garantir que as otimizações permanecem!
