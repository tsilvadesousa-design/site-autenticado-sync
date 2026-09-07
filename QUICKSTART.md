# Guia Rápido de Início

## 🚀 5 Minutos para Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Google (Firebase)
- Git

### 1️⃣ Firebase Setup (2 min)

1. Acesse [firebase.google.com](https://firebase.google.com)
2. Clique "Go to console"
3. "Create project" → Nome: `site-autenticado-sync`
4. Aguarde a criação

### 2️⃣ Ativar Serviços (1 min)

**Authentication:**
- Authentication → Get started
- Ativar "Email/Password"

**Firestore:**
- Firestore Database → Create database
- Production mode → us-central1

### 3️⃣ Clonar & Instalar (2 min)

```bash
# Clonar
git clone https://github.com/tsilvadesousa-design/site-autenticado-sync.git
cd site-autenticado-sync

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 4️⃣ Configurar Variáveis

**frontend/.env.local:**
```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=seu-app-id
VITE_API_URL=http://localhost:3000
```

**backend/.env:**
```env
PORT=3000
FIREBASE_PROJECT_ID=seu-projeto
FIREBASE_PRIVATE_KEY=sua-chave-privada
FIREBASE_CLIENT_EMAIL=seu-email@seu-projeto.iam.gserviceaccount.com
```

### 5️⃣ Rodar Aplicação

```bash
# Na raiz do projeto
npm run dev
```

✅ Pronto! Acesse:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Criar conta e testar sincronização!

## 🎯 Próximas Etapas

1. Ler [README.md](./README.md)
2. Explorar [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Customizar componentes
4. Fazer deploy em produção

## 📚 Documentação Completa

- [SETUP.md](./SETUP.md) - Configuração detalhada
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Problemas comuns

## 💬 Suporte

Tem dúvidas? Abra uma [Issue](https://github.com/tsilvadesousa-design/site-autenticado-sync/issues)

