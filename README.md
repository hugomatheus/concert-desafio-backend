# Concert Desafio

## Ferramentas Utilizadas
- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Docker**
- **Angular**
- **Angular Material**

## Pré-requisitos
- Ter **Docker** e **Docker Compose** instalados.

---

## Estrutura de Pastas
A estrutura dos dois projetos dentro da mesma pasta segue o modelo abaixo:

```
concert-desafio/
├── concert-desafio-backend/
│   ├── src/
│   ├── .env.example
│   ├── docker-compose.yml
│   └── ...
├── concert-desafio-frontend/
│   ├── src/
│   ├── angular.json
│   ├── docker-compose.yml
│   └── ...
```

---

## Backend

### Configuração

1. **Clonar o projeto**:
   ```bash
   git clone https://github.com/hugomatheus/concert-desafio-backend.git
   ```

2. **Entrar na pasta do projeto**:
   ```bash
   cd concert-desafio-backend
   ```

3. **Criar o arquivo `.env` com base no `.env.example`**:
   ```bash
   cp .env.example .env
   ```

4. **Executar o comando para subir o banco de dados e o backend do desafio**:
   ```bash
   docker compose up -d --build
   ```

   > **Nota:** Serão utilizadas as portas:
   > - **3838** para a API.
   > - **5432** para o PostgreSQL.

5. **Acessar a documentação Swagger**:
   [http://localhost:3838/docs](http://localhost:3838/docs)

---

### Endpoints da API

- **GET /machines**
  - Lista todas as máquinas cadastradas, com possibilidade de filtrar pelo status da máquina.

- **GET /machines/:id**
  - Retorna os dados de uma máquina específica com base no ID informado.

- **POST /machines**
  - Cadastra uma máquina.
  - **Dados obrigatórios:**
    - `name`: string.
    - `location`: string, no formato "latitude, longitude".
    - `status`: string, com valores possíveis: "operando", "parada para manutenção", "desligada".
  - **Exemplo de payload:**
    ```json
    {
      "name": "Máquina de teste",
      "location": "-9.664220, -35.741600",
      "status": "desligada"
    }
    ```

- **PUT /machines/:id**
  - Atualiza os dados de uma máquina específica com base no ID informado.
  - **Validações:**
    - `name`: obrigatório, string.
    - `location`: obrigatório, no formato "latitude, longitude".
    - `status`: obrigatório, com valores possíveis: "operando", "parada para manutenção", "desligada".
  - Atualiza os dados da máquina e envia as informações via WebSocket.

- **DELETE /machines/:id**
  - Remove uma máquina específica com base no ID informado.

---

### Task Scheduling

Para cumprir o desafio, foi criada uma simulação que altera aleatoriamente o status da última máquina cadastrada a cada 10 segundos e envia os dados via WebSocket.

---

## Frontend

### Configuração

1. **Clonar o projeto**:
   ```bash
   git clone https://github.com/hugomatheus/concert-desafio-frontend.git
   ```

2. **Entrar na pasta do projeto**:
   ```bash
   cd concert-desafio-frontend
   ```

3. **Executar o comando para subir o frontend**:
   ```bash
   docker compose up -d --build
   ```

4. **Acessar o frontend**:
   [http://localhost:4200/](http://localhost:4200/)

---

## Observações
- Certifique-se de que as portas utilizadas (3838 para o backend e 4200 para o frontend) estão livres no sistema antes de iniciar o Docker Compose.

