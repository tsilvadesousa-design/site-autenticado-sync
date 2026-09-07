# Guia de Deployment

## 🚀 Deploy em Produção

### Frontend - Vercel

#### 1. Preparar o Projeto

```bash
cd frontend
npm run build
```

#### 2. Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione o repositório GitHub
4. Configure as variáveis de ambiente:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - etc...
5. Deploy

#### 3. Variáveis de Ambiente no Vercel

```env
VITE_FIREBASE_API_KEY=sua-chave
VITE_FIREBASE_AUTH_DOMAIN=seu-dominio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu-projeto
VITE_FIREBASE_STORAGE_BUCKET=seu-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu-id
VITE_FIREBASE_APP_ID=seu-app-id
VITE_API_URL=https://seu-api.herokuapp.com
```

### Backend - Heroku

#### 1. Preparar o Projeto

```bash
cd backend
npm run build
```

#### 2. Criar app no Heroku

```bash
heroku login
heroku create seu-app-name
```

#### 3. Configurar Variáveis de Ambiente

```bash
heroku config:set FIREBASE_PROJECT_ID=seu-projeto
heroku config:set FIREBASE_PRIVATE_KEY="sua-chave"
heroku config:set FIREBASE_CLIENT_EMAIL=seu-email@projeto.iam.gserviceaccount.com
```

#### 4. Deploy

```bash
git push heroku main
```

### Firebase - Production

#### 1. Configurar Firestore

1. Firebase Console → Firestore Database
2. Alternar para "Production mode"
3. Atualizar regras de segurança

#### 2. Regras Otimizadas para Produção

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuth() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Usuários
    match /users/{userId} {
      allow read: if isOwner(userId);
      allow write: if isOwner(userId) && 
        request.resource.data.keys().hasOnly(['email', 'displayName', 'photoURL', 'updatedAt']);
    }
    
    // Dados de Sincronização
    match /sync/{userId}/{document=**} {
      allow read, write: if isOwner(userId);
    }
  }
}
```

#### 3. Ativar Backups

1. Firebase Console → Firestore Backups
2. Criar política de backup automático
3. Configurar retenção

## 🔒 Segurança

### Frontend

- ✅ Nunca expor chaves privadas
- ✅ Usar variáveis de ambiente
- ✅ Implementar rate limiting
- ✅ Validar entrada do usuário

### Backend

- ✅ Validar todos os inputs
- ✅ Usar HTTPS
- ✅ Implementar rate limiting
- ✅ Adicionar CSRF protection
- ✅ Sanitizar dados

### Firebase

- ✅ Regras de segurança restritivas
- ✅ Autenticação obrigatória
- ✅ Encriptação em trânsito
- ✅ Backups automáticos

## 📊 Monitoramento

### Google Cloud Monitoring

1. Google Cloud Console
2. Criar alertas para:
   - Erros de autenticação
   - Taxa de erro do Firestore
   - Latência
   - Uso de dados

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "seu-dsn",
  environment: "production",
});
```

## 🔄 CI/CD

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Frontend
        run: |
          cd frontend
          npm install
          npm run build
      
      - name: Deploy Backend
        run: |
          cd backend
          npm install
          npm run build
```

## 📈 Scaling

### Firestore

- Escalabilidade automática
- Pay-as-you-go
- Suporta bilhões de operações/dia

### Backend

- Adicionar réplicas no Heroku
- Usar CDN para assets estáticos
- Implementar caching

## ✅ Checklist de Deploy

- [ ] Todas as variáveis de ambiente configuradas
- [ ] Regras de Firestore em production mode
- [ ] HTTPS ativado
- [ ] Backups configurados
- [ ] Monitoramento ativado
- [ ] Rate limiting ativado
- [ ] Logs configurados
- [ ] Testes passando
- [ ] Build sem erros
- [ ] Performance otimizada

