# 🦸‍♂️ Sistema de Gerenciamento de Heróis (.NET 9 + Angular)

---

## 🏗️ Arquitetura e Detalhes Técnicos

O projeto foi construído seguindo uma separação clara de responsabilidades:

### 🌐 Frontend (Angular)
- **Componentização:** A interface é dividida em componentes reutilizáveis para listagem, cadastro e edição.
- **Services:** Centralizam a comunicação com a API usando o `HttpClient`, garantindo que os componentes foquem apenas na lógica de visualização.
- **RxJS:** Utilizado para lidar com a natureza assíncrona das requisições e fluxos de dados.

### 🔌 API (ASP.NET Core 9)
- **Controllers:** Endpoints RESTful bem definidos para operações de CRUD.
- **DTOs (Data Transfer Objects):** Utilizados para receber dados da requisição, garantindo que o modelo do banco de dados não seja exposto diretamente.
- **Entity Framework Core:** Camada de abstração de dados utilizando o provedor `InMemory` para facilitar testes rápidos e portabilidade.

---

## 🚀 Próximos Passos e Pontos de Melhoria

Este projeto foi desenvolvido como uma base sólida, mas possui um roadmap de evoluções planejadas:

### 🧪 Testes (Qualidade de Software)
- **Testes Unitários:** Implementar testes para garantir que as regras de negócio (como a validação de nome único e o `Trim`) funcionem isoladamente.
- **Testes de Integração:** Validar o fluxo completo entre o Controller e o Banco de Dados.
- **Testes de Frontend (Jasmine/Karma):** Garantir que os componentes do Angular renderizem e processem os dados corretamente.

### 📝 Validação de Formulários
- **Angular Reactive Forms:** Implementar validações visuais em tempo real no frontend (ex: campos obrigatórios, tamanho mínimo de nome, validação de tipos).
- **FluentValidation (.NET):** No backend, substituir as validações manuais por uma biblioteca robusta para centralizar as regras de entrada de dados.

### 💾 Persistência de Dados
- **Migração para Banco Real:** Substituir o `InMemory` por **SQLite** ou **PostgreSQL** para que os heróis cadastrados não sejam perdidos ao reiniciar a aplicação.

### 🔐 Segurança
- **CORS:** Refinar as políticas de acesso para permitir apenas domínios confiáveis.
- **Autenticação:** Adicionar proteção de rotas via JWT (JSON Web Token).



## 🛠️ Rodando o projeto

Este guia orienta a configuração e execução do projeto em ambiente local utilizando o **VS Code**.

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **SDK do .NET 9.0:** [Download .NET 9.0](https://dotnet.microsoft.com/download/dotnet/9.0)
2. **Node.js (LTS):** [Download Node.js](https://nodejs.org/)
3. **Visual Studio Code:** [Download VS Code](https://code.visualstudio.com/)

---

## 🛠️ Configuração e Execução

### 1. Preparando o VS Code
Abra a pasta raiz do projeto no VS Code. 

> **Dica:** Para uma melhor experiência, instale a extensão **C# Dev Kit** da Microsoft.

### 2. Rodando o Backend (API)
O servidor backend deve estar rodando para que o site consiga carregar e salvar os dados.

1. Abra um terminal no VS Code (`Ctrl + '`).
2. Navegue até a pasta do servidor e inicie a aplicação:
```powershell
cd HeroisAPI
dotnet run
```

3. A API estará disponível em: http://localhost:5134

4. Para ver a documentação dos endpoints, acesse o Swagger em: http://localhost:5134/

### 3. Rodando o Frontend (Site)
Com o backend já em execução, abra um novo terminal no VS Code (clique no ícone de + no canto do terminal):

1. Navegue até a pasta do cliente e instale as dependências (necessário apenas na primeira vez):
 ```powershell
cd DesafioHeroisFrontEnd
npm install
```

2. Inicie o site:
```powershell
npm run start
```

3. O site poderá ser acessado em: http://localhost:4200

🏗️ Detalhes Técnicos
Tecnologia: .NET 9.0.

Banco de Dados: Entity Framework Core (In-Memory). Os dados são apagados sempre que o servidor é reiniciado.

Frontend: Angular consumindo a API na porta 5134.

🆘 Solução de Problemas
Erro "npm not found": Certifique-se de que instalou o Node.js e reiniciou o VS Code.

Erro de SDK: Se o comando dotnet run falhar, verifique se instalou o SDK 9.0 (digite dotnet --version para conferir).

CORS ou Conexão: Se o site abrir mas não carregar os heróis, verifique se o terminal do Backend ainda está rodando.