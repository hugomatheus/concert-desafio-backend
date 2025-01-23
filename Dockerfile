# Usar imagem oficial do Node.js com suporte ao npm
FROM node:20-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código-fonte da aplicação para dentro do container
COPY . .

# Expor a porta da aplicação
EXPOSE 3838

# Comando para iniciar o ambiente de desenvolvimento
CMD ["npm", "run", "start:dev"]
