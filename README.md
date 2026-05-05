# 🚀 Evolução da Landing Page (Angular + TypeScript)

Este projeto marca a segunda fase do meu Plano de Desenvolvimento Individual (PDI), com o objetivo de evoluir uma Landing Page estática (anteriormente feita em HTML, CSS e JS puros) para uma aplicação robusta, dinâmica e gerenciável.

Nesta etapa, o foco é a consolidação de conhecimentos em frameworks modernos, componentização, roteamento e controle de estado no front-end.

---

## 📌 Índice
* [🎯 Objetivo](#-objetivo)
* [💻 Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [✨ Novas Funcionalidades](#-novas-funcionalidades)
* [📐 Arquitetura e Estrutura](#-arquitetura-e-estrutura)
* [📅 Cronograma de 8 Semanas](#-cronograma-de-8-semanas)
* [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
* [👥 Envolvidos](#-envolvidos)

---

## 🎯 Objetivo
Transformar a landing page autobiográfica em uma aplicação completa que possua:
* Divisão clara de **Componentes** reutilizáveis.
* **Painel Administrativo** para gestão das informações.
* Sistema de **Autenticação Simples** (Login).
* **Edição de Conteúdo** dinâmico (Títulos, subtítulos e textos).
* **Persistência de Dados** utilizando o `localStorage` do navegador.

---

## 💻 Tecnologias Utilizadas
A evolução do projeto adota ferramentas mais mdoernas para acelerar o desenvolvimento e facilitar a manutenção:

* **Framework:** Angular 
* **Linguagem:** TypeScript
* **Estilização:** SASS / SCSS
* **Gerenciamento de Rotas:** Angular Router
* **Formulários:** Reactive Forms (Angular)

---

## ✨ Novas Funcionalidades
A aplicação deverá possuir as seguintes funcionalidades ao fim:
- [ ] **Acesso de Usuário:** Visualização da Landing Page renderizada dinamicamente.
- [ ] **Autenticação:** Rota protegida `/login` para acesso restrito.
- [ ] **Gestão (Admin):** Acesso ao painel `/admin` apenas para usuários autenticados.
- [ ] **Edição:** Formulários reativos para alterar o conteúdo da página inicial.
- [ ] **Salvamento:** Alterações refletidas na Landing Page através da persistência de dados.

---

## 📐 Arquitetura e Estrutura
O projeto adota uma arquitetura modularizada dentro do Angular, separando responsabilidades de interface, regras de negócio e proteção de rotas:

```
src/app/
 ├── components/       
 ├── pages/           
 │    ├── landing/     
 │    ├── admin/       
 │    └── login/      
 ├── services/        
 ├── guards/           
 └── models/           
```

---

## 📅 Cronograma de 8 Semanas

### 🟢 Semanas 1 e 2: Estrutura Angular e Componentização
**Objetivo:** Organizar o projeto em Angular e transformar a landing page em componentes.
- [ ] Criar o projeto no GitHub institucional.
- [ ] Inicializar o projeto com Angular CLI e SASS (`ng new sassy-project --style=sass`).
- [ ] Dividir a landing page em componentes (Header, Hero, About, Footer).
- [ ] Criar o modelo de dados (`landing.model.ts`).
- [ ] Criar o serviço (`landing.service.ts`) e centralizar os dados via *mock*.

### 🟡 Semanas 3 e 4: Rotas e Painel Administrativo
**Objetivo:** Adicionar navegação e criar a estrutura do painel admin.
- [ ] Configurar roteamento (`/` para landing e `/admin` para painel).
- [ ] Criar a view da página de administração.
- [ ] Implementar formulário com **Reactive Forms** (Título, Subtítulo, Texto de Seção).
- [ ] Conectar o formulário ao `landing.service.ts` para envio de dados.

### 🟠 Semanas 5 e 6: Autenticação e Persistência
**Objetivo:** Adicionar controle de acesso e salvar os dados no navegador.
- [ ] Desenvolver a view da página `/login`.
- [ ] Criar o serviço de autenticação (`auth.service.ts`) com armazenamento de sessão.
- [ ] Criar e aplicar o Guard de rota (`auth.guard.ts`) para proteger a rota `/admin`.
- [ ] Atualizar o `landing.service.ts` para salvar e carregar as informações do `localStorage`.

### 🔴 Semanas 7 e 8: Refinamento e Melhorias
**Objetivo:** Melhorar a experiência do usuário (UX) e garantir a qualidade do código.
- [ ] Adicionar feedback visual (mensagens de sucesso ao salvar dados).
- [ ] Adicionar estados de *Loading* em transições.
- [ ] Refatorar o código (melhorar tipagens, limpar código duplicado e organizar Models).
- [ ] *Opcional:* Criar um Interceptor HTTP para injetar headers de autenticação.

---

## 🚀 Como Executar o Projeto

1. Clone o repositório para sua máquina local:
   ```
   git clone [https://github.com/sua-organizacao/seu-repositorio.git](https://github.com/sua-organizacao/seu-repositorio.git)
   ```
2. Acesse a pasta do projeto:
   ```
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```
   ng serve
   ```
5. Abra no navegador: `http://localhost:4200/`

---

## 👥 Envolvidos
* **Desenvolvedor:** Danilo Toriy
* **Code Reviewer:** Raphael Galdino
* **Status do Projeto:** 🏗️ Planejamento
