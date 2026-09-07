# Troubleshooting

## Problemas Comuns e Soluções

### 🔴 Frontend

#### "VITE_FIREBASE_API_KEY não encontrada"

**Problema:** Erro ao iniciar o servidor frontend

**Solução:**
1. Verifique se `frontend/.env.local` existe
2. Copie as variáveis do Firebase Console
3. Reinicie: `Ctrl+C` → `npm run dev:frontend`

#### "Firebase não inicializa"

**Problema:** Erro de inicialização do Firebase no console

**Solução:**
1. Verifique as credenciais em `frontend/.env.local`
2. Confirme que o projeto Firebase está ativo
3. Certifique-se de que Authentication está habilitado

#### "Erro: Cannot find module 'react'"

**Problema:** Dependências não instaladas

**Solução:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### "TypeError: useAuthStore is not a function"

**Problema:** Store Zustand não importado corretamente

**Solução:**
1. Verifique o import: `import { useAuthStore } from '../store/authStore'`
2. Certifique-se de que o arquivo existe
3. Reinicie o servidor de desenvolvimento

#### "CORS error quando chamando API"

**Problema:** Requisições para backend bloqueadas

**Solução:**
1. Verifique se backend está rodando em `http://localhost:3000`
2. Confirme que `VITE_API_URL=http://localhost:3000`
3. Verifique CORS no backend

### 🔴 Backend

#### "Port 3000 já em uso"

**Problema:** Outra aplicação usando a mesma porta

**Solução:**
```bash
# Linux/Mac - encontre e mate o processo
lsof -i :3000
kill -9 PID

# Windows
netstat -ano | findstr :3000
taskkill /PID PID /F

# Ou mude a porta
PORT=3001 npm run dev:backend
```

#### "Firebase não inicializa no backend"

**Problema:** Erro de credenciais Firebase

**Solução:**
1. Verifique `backend/.env` com as credenciais corretas
2. Certifique-se de que `FIREBASE_PRIVATE_KEY` tem `\n` corretos
3. Teste a chave no Firebase Console

#### "Cannot find module 'firebase-admin'"

**Problema:** Dependências não instaladas

**Solução:**
```bash
cd backend
npm install
```

#### "Error: FIREBASE_PROJECT_ID is undefined"

**Problema:** Variáveis de ambiente não carregadas

**Solução:**
1. Crie `backend/.env` com todas as variáveis
2. Copie do `backend/.env.example`
3. Preencha com suas credenciais reais

#### "JWT verification failed"

**Problema:** Token inválido ou expirado

**Solução:**
1. Verifique que o token é enviado no header: `Authorization: Bearer TOKEN`
2. Confirme que o token não expirou
3. Faça login novamente para obter novo token

### 🔴 Firebase

#### "Permission denied on /sync/{userId}/data"

**Problema:** Regras de segurança Firestore muito restritivas

**Solução:**
1. Vá para Firebase Console → Firestore → Rules
2. Atualize as regras conforme [SETUP.md](./SETUP.md)
3. Publique as regras

#### "Cloud Firestore is not activated"

**Problema:** Firestore não criado

**Solução:**
1. Firebase Console → Firestore Database
2. Clique em "Create database"
3. Selecione "production mode"
4. Escolha a região
5. Create

#### "Authentication is not initialized"

**Problema:** Firebase Authentication não ativado

**Solução:**
1. Firebase Console → Authentication
2. Clique em "Get started"
3. Ative "Email/Password"
4. Salve

### 🔴 Sincronização

#### "Dados não sincronizam entre abas"

**Problema:** Listeners do Firestore não funcionando

**Solução:**
1. Verifique conexão com internet
2. Abra DevTools → Network para verificar requisições
3. Confirme que Firestore Database está ativo
4. Verifique as regras de segurança

#### "Realtime updates lentos"

**Problema:** Sincronização atrasada

**Solução:**
1. Verifique a latência da rede
2. Reduza a frequência de atualizações
3. Use índices no Firestore para queries otimizadas
4. Considere usar Realtime Database para dados críticos

### 🔴 Autenticação

#### "Invalid email or password"

**Problema:** Credenciais incorretas no login

**Solução:**
1. Verifique o email digitado
2. Certifique-se de que a senha está correta
3. Se perdeu a senha, use "Esqueci a senha"

#### "User already exists"

**Problema:** Email já registrado

**Solução:**
1. Tente fazer login com esse email
2. Use outro email para criar conta
3. Entre em contato para recuperar acesso

#### "Token expired"

**Problema:** Sessão expirou

**Solução:**
1. Faça logout e login novamente
2. Atualize a página
3. Limpe localStorage e tente novamente

## 🔍 Debugging

### Habilitar Logs no Frontend

```typescript
// src/App.tsx
if (process.env.NODE_ENV === 'development') {
  console.log('Auth State:', useAuthStore.getState())
  console.log('Sync State:', useSyncStore.getState())
}
```

### Habilitar Logs no Backend

```typescript
// src/index.ts
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body)
    next()
  })
}
```

### Verificar Firebase no Console

1. **Authentication:**
   - Firebase Console → Authentication
   - Verifique usuários criados

2. **Firestore:**
   - Firebase Console → Firestore Database
   - Verifique coleções e documentos
   - Verifique regras de segurança

3. **Logs:**
   - Firebase Console → Logs
   - Procure por erros

## 📊 Performance

### Monitorar Performance

```typescript
// Frontend
const startTime = performance.now()
await syncData()
const endTime = performance.now()
console.log(`Sync took ${endTime - startTime}ms`)
```

### Otimizar Firestore

1. Criar índices para queries:
   - Firebase Console → Firestore → Índices
   - Criar índices compostos para campos frequentes

2. Limitar resultados:
   ```typescript
   .limit(10)
   ```

3. Usar paginação:
   ```typescript
   .startAfter(lastDoc)
   ```

## 🆘 Suporte Adicional

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📝 Reportar Bugs

Se encontrou um bug:

1. Verifique se já existe uma issue aberta
2. Crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Versões (Node.js, npm, etc)
   - Logs de erro
   - Screenshots (se aplicável)

