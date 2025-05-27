# Usa a imagem oficial do SDK .NET 9.0
FROM mcr.microsoft.com/dotnet/sdk:9.0

# Instala dependências para adicionar Node.js
RUN apt-get update && apt-get install -y curl gnupg

# Instala Node.js 18 e npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Copia o csproj e restaura dependências do backend (cache eficiente)
COPY Backend/*.csproj ./Backend/
RUN dotnet restore ./Backend

# Copia todo o restante do código para dentro do container
COPY . .

# Expõe as portas da API e do frontend
EXPOSE 5260
EXPOSE 5173

# Comando para rodar backend e frontend juntos
CMD bash -c "cd Backend && dotnet run --urls http://0.0.0.0:5260 & cd ../frontend && npm install && npm run dev"
