# CRUD de Séries — React

Este projeto é um pequeno CRUD de séries feito em **React**. Ele permite **cadastrar**, **listar** e **excluir** séries armazenando os dados no `localStorage` do navegador. A navegação é feita com `react-router-dom` usando **Hash Router** (para hospedagem estática no github).

## Como executar o projeto

### Pré-requisitos
- **Node.js** 
- **npm** 

### Passos
```bash
# Instalar dependências
npm install
# Subir o servidor de desenvolvimento (Vite)
npm run dev

```

---

##  Estrutura


```
src/
├─ components/
│  ├─ NavBar/NavBar.jsx
│  ├─ SerieForm/SerieForm.jsx
│  └─ SerieList/SerieList.jsx
├─ pages/
│  ├─ Home.jsx
│  ├─ Cadastro.jsx
│  ├─ Lista.jsx
│  └─ Sobre.jsx
├─ App.jsx
├─ main.jsx
├─ index.css
└─ App.css
```

---

##  O que cada parte faz

### `NavBar`
Barra de navegação principal com links para **Página Inicial**, **Cadastro**, **Lista** e **Sobre**.

### `SerieForm`
Formulário controlado para criar uma série.  
- Validação simples de obrigatoriedade em todos os campos.  
- Ao enviar, lê a lista salva em `localStorage` (`series`), **adiciona** um novo item com `id` baseado em timestamp e salva novamente.  
- Campos: título, temporadas, lançamento, diretor, produtora, categoria, data assistida.

### `SerieList`
Lista as séries salvas no `localStorage`.  
- Carregamento inicial a partir de `localStorage`.  
- Botão **Excluir** remove a série e persiste a lista atualizada.  
- Botão **Editar** navega para a rota de cadastro enviando o objeto da série no `state` da navegação.

### Páginas
- **Home**: mensagem de boas-vindas.  
- **Cadastro**: renderiza o `SerieForm`.  
- **Lista**: renderiza a `SerieList`.  
- **Sobre**: descrição rápida do projeto.  


---

##  Decisões de desenvolvimento

- **HashRouter**: a biblioteca foi escolhido para facilitar o deploy na hospedagem estática do github pages.  
- **Persistência com `localStorage`**: solução para não precisar de backend.
- **IDs com `Date.now()`**: suficiente para o escopo; baixa chance de colisão em usos normais.  
- **Validação mínima**: apenas “campo obrigatório” por simplicidade.  
- **Edição planejada**: o formulário já aceita uma prop `initial` para preencher os campos em modo edição; a página de `Cadastro` deve repassar o `state` da navegação ao formulário e o `handleSubmit` do formulário deve **atualizar** um item existente quando houver `id` em vez de sempre criar.
- **Lógica nos componentes**: as páginas foram mantidas o mais simples possível, apenas renderizando os componentes. Toda a lógica foi concentrada nos componentes, favorecendo reuso.

---

## Como limpar os dados
Como os dados ficam no `localStorage`, é possível limpá-los pelo DevTools do navegador (Application -> Local Storage -> localhost -> `series`):

---
