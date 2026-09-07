# Guia de Configuração

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Google (para Firebase)
- Git

## 1. Configurar Firebase

### Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Criar projeto"
3. Nome: `site-autenticado-sync`
4. Ative Google Analytics (opcional)
5. Criar projeto

### Ativar Autenticação

1. No Firebase Console, vá para **Authentication**
2. Clique em **Get started**
3. Ative **Email/Password**
4. Ative **Google** (opcional)

### Criar Firestore Database

1. Vá para **Firestore Database**
2. Clique em **Create database**
3. Selecione **production mode**
4. Escolha localização (recomendado: us-central1)
5. Criar

### Regras de Segurança do Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem acessar apenas seus próprios documentos
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Dados de sincronização em tempo real
    match /sync/{userId}/data/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Preferências do usuário
    match /preferences/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 2. Configurar Frontend

### Instalar Dependências

```bash
cd frontend
npm install
```

### Variáveis de Ambiente

Crie `frontend/.env.local`:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:3000
```

**Como encontrar essas credenciais:**

1. Firebase Console → Projeto → ⚙️ Configurações
2. Abrir "Meus apps" → Web
3. Copiar o objeto `firebaseConfig`

## 3. Configurar Backend

### Instalar Dependências

```bash
cd backend
npm install
```

### Gerar Chave de Serviço

1. Firebase Console → Configurações → Contas de Serviço
2. Clique em "Gerar nova chave privada"
3. Salve o arquivo JSON

### Variáveis de Ambiente

Crie `backend/.env`:

```env
PORT=3000
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
```

## 4. Desenvolvimento Local

### Iniciar Ambos os Servidores

```bash
# Na raiz do projeto
npm run dev
```

Ou em terminais separados:

```bash
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

### URLs Locais

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 5. Testar a Autenticação

1. Acesse http://localhost:5173
2. Clique em "Criar Conta"
3. Registre com email e senha
4. Faça login
5. Verifique no Firebase Console → Authentication se o usuário foi criado

## 6. Testar Sincronização em Tempo Real

1. Abra o site em 2 abas diferentes
2. Faça login em ambas
3. Mude o tema em uma aba
4. Observe a mudança automática na outra aba

## 🔍 Verificar Instalação

```bash
# Verificar Node.js
node --version  # v18+

# Verificar npm
npm --version   # 9+

# Instalar dependências
npm install

# Rodar desenvolvimento
npm run dev
```

## 🐛 Problemas Comuns

### "VITE_FIREBASE_API_KEY não encontrada"
- Verifique se `frontend/.env.local` existe
- Reinicie o servidor: Ctrl+C → `npm run dev`

### "Firebase não inicializa"
- Verificar se as credenciais em `.env.local` estão corretas
- Verificar se Firestore está criado no Firebase Console

### "Port 3000 já em uso"
- Mude a porta em `backend/.env`: `PORT=3001`
- Atualize `VITE_API_URL` no frontend

## ✅ Próximos Passos

1. Leia [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Explore o código em `frontend/src` e `backend/src`
3. Customize componentes e estilos
4. Deploy para produção
