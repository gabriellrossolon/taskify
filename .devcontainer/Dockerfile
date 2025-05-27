# Usa a imagem oficial do SDK .NET 7 para desenvolvimento
FROM mcr.microsoft.com/dotnet/sdk:7.0

# Define diretório de trabalho
WORKDIR /app

# Copia o csproj e restaura as dependências primeiro (cache eficiente)
COPY *.csproj ./
RUN dotnet restore

# Copia todo o restante do código
COPY . ./

# Expõe a porta da API (5260)
EXPOSE 5260

# Comando padrão para rodar a API
CMD ["dotnet", "run", "--urls", "http://0.0.0.0:5260"]
