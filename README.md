<h1 align="center">Blowtype: Sistema Web para Aperfeiçoamento das Habilidades de Digitação</h1>

## Descrição do Projeto

Blowtype é uma aplicação web desenvolvida para a disciplina de Programação para Web 2 do curso de Análise e Desenvolvimento de Sistemas do Instituto Federal de Educação, Ciência e Tecnologia da Paraíba - Campus Cajazeiras. O sistema tem como objetivo ajudar usuários a aprimorar suas habilidades de digitação, oferecendo feedback em tempo real sobre desempenho, como WPM (palavras por minuto), acurácia e progresso geral.

## Status do Projeto

<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>

## :man_technologist: Tecnologias Utilizadas

- React
- Vite
- TypeScript
- Vitest
- Cypress
- Playwright
- Node.js
- Express
- SQLite
- VS Code
- Git & GitHub

## :hammer: Funcionalidades

- Seleção de livros para treino de digitação
- Escolha de capítulos para praticar
- Digitação por páginas com textos reais
- Exibição de métricas: WPM, acurácia e progresso
- Histórico de evolução do usuário

## :rocket: Como Rodar o Projeto

### 1️⃣ Pré-requisitos

- Node.js instalado ([Download](https://nodejs.org))
- Git instalado

### 2️⃣ Clone o repositório

```bash
git clone git@github.com:ericksjp/blowtype.git
cd blowtype
git fetch origin
git checkout dev
git pull
```

### 3️⃣ Instale as dependências do frontend

```bash
cd frontend
npm install
```

### 4️⃣ Instale as dependências do backend

```bash
cd ../backend
npm install
```
> ⚠️ **Atenção:** O backend deste projeto só está rodando corretamente com o **Node.js versão 20**.  
> Recomenda-se instalar ou utilizar o Node 20 para evitar incompatibilidades.

### 5️⃣ Configure variáveis de ambiente

Copie os arquivos `.env.example` para `.env` tanto no frontend quanto no backend e ajuste conforme necessário.

### 6️⃣ Execute o backend

```bash
npm run dev
```
> O backend será iniciado em modo de desenvolvimento.

### 7️⃣ Execute o frontend

Abra outro terminal e execute:

```bash
cd frontend
npm run dev
```
> O frontend estará disponível em `http://localhost:5173`

---

## :test_tube: Testes

O projeto possui testes unitários e end-to-end:

### ✅ Testes unitários (Vitest)

```bash
npm run test
```

### 🧪 Testes end-to-end (Cypress)

Antes de rodar os testes E2E, certifique-se que o frontend está rodando.

#### Modo interativo

```bash
npm run cypress
```

#### Modo headless

```bash
npm run cypress:run
```

---

## Estrutura de Pastas

```
blowtype/
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── cypress/
│   ├── package.json
│   └── ...
└── README.md
```

---

## :busts_in_silhouette: Autores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ericksjp">
        <img src="https://avatars.githubusercontent.com/u/126838970?v=4" width="60px;" alt="Erick"/>
        <br/>
        <sub><b>Erick Ribeiro de Sousa</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/tassomoreira">
        <img src="https://avatars.githubusercontent.com/u/99520151?v=4" width="60px;" alt="Tasso"/>
        <br/>
        <sub><b>Tasso Moreira de Oliveira</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/GerlandioBernardo">
        <img src="https://avatars.githubusercontent.com/u/126838970?v=4" width="60px;" alt="Gerlandio" />
        <br/>
        <sub><b>Gerlândio da Silva Bernardo</b></sub>
      </a>
    </td>
  </tr>
</table>
