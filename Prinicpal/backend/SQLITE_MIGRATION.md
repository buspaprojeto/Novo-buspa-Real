# Migração de MySQL para SQLite

## Mudanças Implementadas

### 1. Dependencies (`package.json`)
- ❌ Removido: `mysql2`
- ✅ Adicionado: `sqlite3`

### 2. Database Connection (`config/DBConn.js`)
- Agora usa SQLite3 em arquivo local
- Caminho configurável via `DB_PATH` no `.env`
- Padrão: `./database.db` na raiz do backend

### 3. Controllers (`controllers/AuthControllers.js`)
- Adaptadas queries SQL para sintaxe SQLite
- Novas funções helpers: `dbRun()`, `dbGet()`, `dbAll()`
- Promisified callbacks para melhor async/await

### 4. Express Middleware (`index.js`)
- Alterado: `req.pool` → `req.db`
- Passa instância do SQLite para controllers

## Setup

### 1. Instalar dependências
```bash
cd Prinicpal/backend
npm install
```

### 2. Configurar `.env`
```bash
cp .env.example .env
# Editar .env conforme necessário
```

### 3. Executar servidor
```bash
npm start
```

O banco `database.db` será criado automaticamente.

## Estrutura do Banco

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Observações

- Não há limite de conexões (SQLite é local)
- Melhor para desenvolvimento e projetos pequenos
- Para produção, considere migrations estruturadas
