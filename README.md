## 📋 Sobre o Projeto

Este repositório contém um framework robusto de testes automatizados híbridos (**E2E & API**) desenvolvido com **Cypress** e **Cucumber**. O projeto utiliza a arquitetura **Page Object Model (POM)** para maximizar o reaproveitamento de código e facilitar a manutenção.

Os testes são escritos em **Gherkin**, permitindo uma documentação viva das funcionalidades e facilitando a colaboração entre QA, Devs e POs (BDD).

### ✨ Principais Funcionalidades
*   **Testes Híbridos:** Cobertura de cenários de Interface (WEB) e Backend (API) no mesmo projeto.
*   **Page Objects:** Encapsulamento de elementos e ações das páginas.
*   **Contextualização:** Separação clara de *steps* e *features* por contexto (Web vs API).
*   **Relatórios:** Integração nativa com pre-processadores para geração de evidências.

***

## 🛠 Tecnologias Utilizadas

*   [Cypress](https://www.cypress.io/) (v12+)
*   [Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) (@badeball)
*   [Node.js](https://nodejs.org/)
*   JavaScript (ES6+)
*   Esbuild (Bundler)

***

## 📂 Estrutura do Projeto

A arquitetura segue a separação de responsabilidades, organizando os testes por camadas e domínios.

```text
Keeggo QA/
│
├── cypress/
│   ├── e2e/
│   │   ├── features/           # Arquivos .feature (Gherkin)
│   │   │   ├── api/            # Cenários de API (ex: getProducts, postCart)
│   │   │   └── web/            # Cenários Web (ex: checkout, addProdutos)
│   │   │
│   │   ├── step_definitions/   # Implementação dos passos (Steps)
│   │   │   ├── api/            # Steps específicos de API
│   │   │   └── web/            # Steps específicos de Web UI
│   │   │
│   │   └── page/               # Page Objects (Elementos e Ações)
│   │       └── web/            # (ex: HomePage.js, CheckoutPage.js)
│   │
│   ├── fixtures/               # Massas de dados estáticas (JSON)
│   └── support/                # Configurações globais e comandos customizados
│
├── cypress.config.js           # Configuração principal do Cypress
└── package.json                # Dependências e Scripts
```

***

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter o ambiente configurado:

*   **Node.js** (Versão LTS recomendada)
*   **NPM** ou **Yarn**
*   Editor de código (VS Code recomendado com extensão *Cucumber (Gherkin) Full Support*)

***

## 🚀 Instalação

Siga os passos abaixo para instalar as dependências do projeto:

```bash
# 1. Clone o repositório (se aplicável) ou acesse a pasta do projeto
cd nome-do-projeto

# 2. Instale as dependências do package.json
npm install

# (Opcional) Caso precise instalar dependências específicas manualmente:
npm install cypress --save-dev
npm install @badeball/cypress-cucumber-preprocessor --save-dev
npm install @bahmutov/cypress-esbuild-preprocessor --save-dev
npm install esbuild --save-dev
```

***

## ▶️ Como Executar os Testes

O projeto possui scripts configurados para diferentes modos de execução.

### 🖥️ Modo Interativo (Cypress Runner)
Abre a interface gráfica do Cypress para selecionar e depurar testes.
```bash
npx cypress open
```

### 🤖 Modo Headless (CI/CD)
Executa todos os testes em segundo plano (terminal).
```bash
npx cypress run
```

### 🎯 Execução por Contexto (Tags ou Pastas)

**Apenas testes de API:**
```bash
npx cypress run --spec "cypress/e2e/features/api/*.feature"
```

**Apenas testes WEB:**
```bash
npx cypress run --spec "cypress/e2e/features/web/*.feature"
```

### 📄 Executar Feature Específica
```bash
# Exemplo WEB
npx cypress run --spec "cypress/e2e/features/web/checkout.feature"

# Exemplo API
npx cypress run --spec "cypress/e2e/features/api/getProducts.feature"
```

***

## 🧩 Padrões de Projeto (Page Objects)

Os arquivos de Page Object estão localizados em `cypress/e2e/page/web/`. Cada classe representa uma página ou componente da aplicação, contendo apenas os **seletores** e **métodos de ação** correspondentes.

Exemplo de estrutura:
*   `HomePage.js`: Ações da Home.
*   `ProdutoPage.js`: Interação com a vitrine de produtos.
*   `CarrinhoPage.js`: Validações do carrinho.
*   `CheckoutPage.js`: Fluxo de finalização de compra.
