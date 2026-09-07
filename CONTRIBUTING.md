# Contribuindo

Obrigado por considerar contribuir! Aqui está como você pode ajudar.

## 🐛 Reportar Bugs

1. Verifique se o bug já foi reportado em [Issues](https://github.com/tsilvadesousa-design/site-autenticado-sync/issues)
2. Se não encontrou, abra uma nova issue com:
   - Título descritivo
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots/logs se aplicável
   - Seu ambiente (Node.js version, OS, etc)

## ✨ Sugerir Features

1. Use o título: "[FEATURE] Descrição breve"
2. Explique o use case
3. Descreva a solução proposta
4. Listas alternativas consideradas

## 🔧 Pull Requests

### Setup Local

```bash
git clone https://github.com/tsilvadesousa-design/site-autenticado-sync.git
cd site-autenticado-sync
npm install
```

### Criar Branch

```bash
git checkout -b feature/minha-feature
# ou
git checkout -b bugfix/meu-bug
```

### Commitar Changes

```bash
git add .
git commit -m "type: descrição concisa"
```

**Tipos de commit:**
- `feat:` Nova feature
- `fix:` Bug fix
- `docs:` Mudanças em documentação
- `style:` Formatting
- `refactor:` Refatoração de código
- `test:` Testes
- `chore:` Dependências, build, etc

### Push & PR

```bash
git push origin feature/minha-feature
```

Abre PR no GitHub com:
- Descrição clara das mudanças
- Reference a issues relacionadas (#123)
- Screenshots se UI change
- Checklist de testes

## 📋 Guidelines

### Código
- Usar TypeScript
- Seguir ESLint config
- Adicionar tipos explícitos
- Comentar lógica complexa

### Commits
- Mensagens em inglês ou português
- Usar conventional commits
- Uma mudança por commit

### Tests
- Adicionar testes para novas features
- Garantir todos os testes passam
- Manter cobertura >80%

### Documentação
- Atualizar README.md
- Adicionar exemplos de uso
- Documentar mudanças em API

## 🚀 Release Process

Mantainers:
1. Merge PRs em `develop`
2. Criar release branch
3. Update version em package.json
4. Update CHANGELOG.md
5. Merge em `main`
6. Tag com versão
7. Deploy

## 💬 Perguntas?

Abra uma [Discussion](https://github.com/tsilvadesousa-design/site-autenticado-sync/discussions) ou issue!

## 🙏 Obrigado!

Suas contribuições fazem a diferença!
