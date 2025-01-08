# Use uma imagem oficial do Node.js
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

RUN npm install axios

# Copia o resto dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta padrão do React (3000)
EXPOSE 3000

# Inicia a aplicação React
CMD ["npm", "start"]
