# Arquitetura da Aplicação

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Login Page  │  │  Dashboard   │  │  Settings    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         ▲                  ▲                  ▲               │
│         └──────────────────┴──────────────────┘               │
│                    Auth Service                               │
│                    Sync Service                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS / WebSocket
                            │
┌─────────────────────────────────────────────────────────────┐
│                     Firebase Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Authentication  │  │  Firestore   │  │ Realtime DB  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Fluxo de Autenticação

```
1. Usuário acessa app
   ↓
2. App carrega do localStorage (se existe)
   ↓
3. Firebase verifica token
   ├─ Token válido → Dashboard
   └─ Token inválido → Login
   ↓
4. Usuário faz login
   ↓
5. Firebase autentica
   ├─ Sucesso → Salva token → Dashboard
   └─ Erro → Mostra mensagem
   ↓
6. App sincroniza dados do usuário
```

## Fluxo de Sincronização em Tempo Real

```
┌─────────────────────────────────────────────────────────────┐
│ Aba 1: Usuário muda tema para "dark"                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Frontend (Aba 1)                                             │
│ 1. Store Zustand atualiza estado                            │
│ 2. SyncService envia para Firestore                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Firestore Database                                           │
│ /sync/{userId}/data/preferences → { theme: "dark" }        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Realtime Listener (Aba 2)                                   │
│ Detecta mudança no banco de dados                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ Frontend (Aba 2)                                             │
│ 1. SyncService recebe atualização                           │
│ 2. Store Zustand atualiza estado                            │
│ 3. UI re-renderiza com novo tema                            │
└─────────────────────────────────────────────────────────────┘
```

## Estrutura de Dados

### Coleção: `users`
```json
{
  "uid": "user-id",
  "email": "user@example.com",
  "displayName": "User Name",
  "photoURL": "https://...",
  "createdAt": 1234567890,
  "lastLogin": 1234567890,
  "isOnline": true
}
```

### Coleção: `sync/{userId}/data`
```json
{
  "preferences": {
    "theme": "dark",
    "language": "pt-BR",
    "notifications": true
  },
  "profile": {
    "bio": "My bio",
    "avatar": "url"
  }
}
```

### Coleção: `preferences/{userId}`
```json
{
  "userId": "user-id",
  "theme": "auto",
  "language": "pt-BR",
  "timezone": "America/Sao_Paulo",
  "notifications": {
    "email": true,
    "push": true
  },
  "updatedAt": 1234567890
}
```

## Componentes Principais

### Frontend

#### `AuthContext` / `AuthStore`
- Gerencia estado de autenticação
- Armazena usuário atual
- Fornece funções de login/logout

#### `SyncService`
- Sincroniza dados em tempo real
- Listeners do Firestore
- Atualiza store local

#### `useAuth()` Hook
- Hook customizado para usar autenticação
- Retorna usuário, isLoading, erro

#### `ProtectedRoute`
- HOC para rotas protegidas
- Redireciona para login se não autenticado

### Backend

#### `/api/auth/*`
- POST `/login` - Autentica usuário
- POST `/register` - Cria novo usuário
- POST `/logout` - Faz logout
- GET `/profile` - Retorna perfil atual

#### `/api/sync/*`
- GET `/data` - Busca dados do usuário
- POST `/data` - Salva dados do usuário
- WS `/events` - WebSocket para eventos em tempo real

#### Middleware
- `verifyToken` - Valida JWT
- `authenticateUser` - Middleware de autenticação
- `errorHandler` - Tratamento de erros

## Fluxo de Requisição

```
┌─────────────────────┐
│  Cliente (React)    │
└──────────┬──────────┘
           │ HTTP/WebSocket
           ▼
┌─────────────────────┐
│  Express Server     │
│  ┌───────────────┐  │
│  │ authenticateUser│  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │   Route      │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  Response    │  │
│  └───────────────┘  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Firebase SDK      │
│  - Authentication   │
│  - Firestore        │
│  - Realtime DB      │
└─────────────────────┘
```

## Padrões de Segurança

### Frontend
- ✅ Armazena token no localStorage (considerando HttpOnly na produção)
- ✅ Verifica autenticação antes de renderizar componentes
- ✅ Limpa dados ao fazer logout

### Backend
- ✅ Valida token em todas as rotas
- ✅ Usa Firebase Admin SDK
- ✅ Implementa rate limiting
- ✅ Valida entrada de dados

### Firestore
- ✅ Regras de segurança restritivas
- ✅ Cada usuário acessa apenas seus dados
- ✅ Índices para queries otimizadas

## Tecnologias Detalhadas

### Firebase
- **Authentication**: Autentica usuários com email/senha
- **Firestore**: Banco de dados NoSQL com sincronização em tempo real
- **Realtime Database**: Para eventos e sincronização em tempo real

### React Ecosystem
- **React Router**: Roteamento de páginas
- **Zustand**: Gerenciamento de estado leve
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling responsivo

### Backend
- **Express.js**: Framework web
- **JWT**: Token-based authentication
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Variáveis de ambiente

## Performance

### Otimizações Frontend
- Code splitting com React.lazy
- Caching de dados locais
- Memoização de componentes
- Listeners eficientes do Firestore

### Otimizações Backend
- Indexação no Firestore
- Caching de tokens
- Compressão GZIP
- Connection pooling

## Escalabilidade

- Firebase escala automaticamente
- Sem servidor a gerenciar
- Pay-as-you-go pricing
- Suporta milhões de usuários simultâneos

## Monitoramento

- Firebase Console para métricas
- Error tracking
- Performance monitoring
- Logs de autenticação
