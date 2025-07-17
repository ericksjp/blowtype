# blowtype

## Testes

Este projeto utiliza dois tipos de testes:

-   ✅ **Testes unitários** com [Vitest](https://vitest.dev)
-   🧪 **Testes end-to-end (E2E)** com [Cypress](https://www.cypress.io)

---

### ⚙️ Scripts disponíveis

```bash
# Rodar testes unitários com Vitest
npm run test

# Abrir o Cypress em modo interativo
npm run cypress

# Executar os testes E2E do Cypress em modo headless
npm run cypress:run
```

### ✅ Testes unitários com Vitest

Para executar os testes unitários:

```bash
npm run test
```

### 🧪 Testes end-to-end com Cypress

#### 📌 Pré-requisitos

Antes de executar o Cypress, é necessário iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

> Deixe esse comando rodando em um terminal separado.

#### 🖥️ Modo interativo

```bash
npm run cypress
```

Isso abrirá a interface gráfica do Cypress.

#### ⚙️ Modo headless (linha de comando)

```bash
npm run cypress:run
```
