# Aury App

O **Aury App** é um aplicativo web progressivo (PWA) moderno, com suporte offline, desenvolvido com [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) e [Redux Toolkit](https://redux-toolkit.js.org/). O projeto foi pensado para oferecer uma experiência offline first.




- **Next.js 15** com App Router
- **TypeScript** para segurança de tipos
- **Tailwind CSS** para estilização rápida e responsiva
- **Redux Toolkit** para gerenciamento de estado
- **Chart.js** para visualização de dados
- **IndexedDB** via `idb` para armazenamento persistente no cliente
- **shadcn/ui** e **Radix UI** para componentes acessíveis e customizáveis
- **PWA**: Service Worker, manifest e cache offline
- **Suporte a temas** com `next-themes`

---

## 🛠️ Primeiros Passos

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18+)
- [npm](https://www.npmjs.com/) (recomendado v9+)


## 📦 Como Instalar e Rodar o Projeto

### Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/yourusername/aury-app.git
   cd aury-app
   ```

2. **Configure variáveis de ambiente (opcional):**
   ```sh
   cp .env.local.example .env.local
   ```

### Build 

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Gere o build:
   ```sh
   npm run build
   ```
   - O comando irá otimizar o projeto, gerar páginas estáticas e configurar o Service Worker para o PWA.
   - Se aparecer o aviso sobre o Browserslist, execute:
     ```sh
     npx update-browserslist-db@latest
     ```

### Rodando o Projeto

Após o build, inicie o servidor de produção:
```sh
npm run start
```
- O app estará disponível em: [http://localhost:3000](http://localhost:3000)
- Também pode ser acessado via rede local, conforme exibido no terminal.

### Observações

Para testar o PWA e o Service Worker, sempre use 'next build' seguido de 'next start'.
No modo dev, o Service Worker não é registrado.

- O Service Worker será registrado automaticamente para garantir o funcionamento offline.
- A página `/offline` será exibida caso o usuário perca a conexão.
- Para desenvolvimento, utilize:
  ```sh
  npm run dev
  ```
  Isso inicia o servidor Next.js em modo de desenvolvimento, com recarregamento automático.

---

## 🚀 Deploy

### Vercel (recomendado)

1. Faça login na Vercel e importe o repositório.
2. Configure as variáveis de ambiente (se necessário) usando o conteúdo do `.env.local`.
3. O build e deploy são automáticos com os scripts padrão:
   - Build: `npm run build`
   - Start: `npm run start`

### Deploy manual (Node.js)

1. Gere o build de produção:
   ```sh
   npm run build
   ```
2. Faça upload da pasta `.next`, `public`, `package.json`, `package-lock.json` e `next.config.js` para o servidor.
3. No servidor, instale dependências e inicie (use um gerenciador como PM2 ou systemd para manter o processo ativo):
   ```sh
   npm install --production
   npm run start
   ```
4. Configure um reverse proxy (Nginx) apontando para a porta 3000.
