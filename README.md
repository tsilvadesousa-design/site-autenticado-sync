# Site Autenticado com Sincronização em Tempo Real

🚀 Aplicação web moderna com autenticação de usuários, sincronização automática entre dispositivos e layout responsivo.

## ✨ Recursos

- 🔐 **Autenticação segura** - Login/Logout com Firebase Auth
- 🔄 **Sincronização em tempo real** - Dados sincronizados entre abas e dispositivos
- 🎨 **Layout moderno** - Interface responsiva com Tailwind CSS
- 🛡️ **Acesso restrito** - Apenas usuários autenticados
- 💾 **Persistência de dados** - Firestore para armazenamento
- 📱 **Cross-device** - Sincroniza em qualquer dispositivo automaticamente

## 🛠️ Stack Tecnológico

### Frontend
- React 18 com TypeScript
- Tailwind CSS para styling
- Firebase SDK
- React Router para navegação
- Zustand para gerenciamento de estado

### Backend
- Node.js com Express
- Firebase Admin SDK
- JWT para autenticação
- CORS configurado

### Banco de Dados
- Firebase Firestore (NoSQL)
- Firebase Authentication
- Firebase Realtime Database

## 📋 Estrutura do Projeto

```
site-autenticado-sync/
├── frontend/              # Aplicação React
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── services/     # Serviços (Auth, Sync)
│   │   ├── store/        # Zustand stores
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx
│   └── package.json
├── backend/               # API Express
│   ├── src/
│   │   ├── routes/       # Rotas da API
│   │   ├── middleware/   # Middleware (Auth)
│   │   ├── services/     # Lógica de negócio
│   │   └── index.ts
│   └── package.json
├── .firebase/             # Configuração Firebase
└── README.md
```

## 🚀 Quick Start

### 1. Clone o repositório
```bash
git clone https://github.com/tsilvadesousa-design/site-autenticado-sync.git
cd site-autenticado-sync
```

### 2. Configure o Firebase
```bash
# Crie um projeto no Firebase Console
# Copie as credenciais para frontend/.env.local e backend/.env
```

### 3. Instale dependências
```bash
npm install
```

### 4. Inicie desenvolvimento
```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3000`

## 📚 Documentação

Ver [SETUP.md](./SETUP.md) para configuração detalhada.
Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para arquitetura do projeto.

## 🔧 Configuração de Ambiente

Crie arquivos `.env` conforme necessário:

**frontend/.env.local:**
```
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_API_URL=http://localhost:3000
```

**backend/.env:**
```
PORT=3000
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_PRIVATE_KEY=sua_private_key
FIREBASE_CLIENT_EMAIL=seu_email@seu_project.iam.gserviceaccount.com
NODE_ENV=development
```

## 🔐 Segurança

- ✅ Autenticação via Firebase
- ✅ JWT tokens para API
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Proteção de rotas no frontend
- ✅ Regras de Firestore restritivas

## 📱 Sincronização em Tempo Real

A aplicação sincroniza automaticamente:
- Dados do usuário
- Preferências (tema, idioma, etc)
- Mudanças em múltiplas abas
- Entre dispositivos diferentes

Usando Firebase Realtime Database e listeners de Firestore.

## 🐛 Troubleshooting

Ver [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) para problemas comuns.

## 📄 Licença

MIT - veja [LICENSE](./LICENSE) para detalhes.

## 👤 Autor

tsilvadesousa-design
