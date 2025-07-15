# Brasil API Client React Estilizado

Este projeto é uma aplicação fullstack que utiliza **React** no frontend e **PHP** no backend para consumir dados públicos da [BrasilAPI](https://brasilapi.com.br/). A interface é moderna, responsiva e utiliza **Tailwind CSS** para estilização.

## Funcionalidades

- Consulta de **CEP** (endereços)
- Consulta de **CNPJ** (dados de empresas)
- Listagem e busca de **bancos brasileiros** por código
- Consulta de **feriados nacionais** por ano

## Estrutura do Projeto

```
brasil-api-client-react/
├── backend/                # Código PHP para servir como proxy da BrasilAPI
│   ├── cep/                # Endpoint para consulta de CEP
│   ├── cnpj/               # Endpoint para consulta de CNPJ
│   ├── banks/              # Endpoint para bancos
│   └── feriados/           # Endpoint para feriados
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js          # Componente principal React
│       ├── index.js        # Entry point React
│       ├── index.css       # Estilos globais (Tailwind)
│       └── ...             # Outros componentes e utilitários
├── package.json            # Dependências do frontend
├── tailwind.config.js      # Configuração do Tailwind CSS
├── postcss.config.js       # Configuração do PostCSS
└── README.md               # Este arquivo
```

## Como rodar o projeto

### Pré-requisitos

- Node.js e npm
- PHP (para rodar o backend)
- XAMPP, WAMP ou similar (opcional, para facilitar o ambiente)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/brasil-api-client-react-estilizado.git
   cd brasil-api-client-react-estilizado
   ```

2. **Instale as dependências do frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure o backend:**
   - Coloque a pasta `backend` no seu servidor local (ex: `c:/xampp/htdocs/brasil-api-client-react/backend`).

4. **Inicie o frontend:**
   ```bash
   npm start
   ```
   O app estará disponível em `http://localhost:3000`.

5. **Acesse o backend:**
   - O backend deve estar acessível em `http://localhost/brasil-api-client-react/backend`.

## Observações

- O frontend faz requisições para o backend PHP, que serve como proxy para a BrasilAPI, evitando problemas de CORS.
- O projeto utiliza Tailwind CSS para estilização rápida e responsiva.
- O backend pode ser facilmente adaptado para outras linguagens.
