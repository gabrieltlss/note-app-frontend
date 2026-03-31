# Aplicativo de notas (Front-end)
Trata-se de interface criada em React de um aplicativo de notas inspirado no Google Keep.

## Funcionalidades e Demonstração
* Principais funcionalidades:
    * Login seguro com Google OAuth
    * Operações básicas (CRUD) para gerenciar notas
    * Visualização notas ativas e arquivadas
    * Exclusão de conta e notas relacionadas

Página de login:

![Página de login.](/img/login-page.png "Página de login.")

Página principal:

![Página principal.](/img/main-page.png "Página principal.")

Criação de nota:

![Criação de nota.](/img/note-modal.png "Criação de nota.")

Página de visualização de conta:

![Página de visualização de conta.](/img/account-page.png "Página de visualização de conta.")

Opções das notas:

![Opções das notas.](/img/note-options.png "Opções das notas.")

Visualizar nota:

![Visualizar nota.](/img/note-view.png "Visualizar nota.")

Atualização de nota:

![Atualizar nota.](/img/note-update.png "Atualizar nota.")


## Tecnologias utilizadas
* Vite e React
* VPS na Hostinger para hospedagem

## Instalação 

Criação de pasta do projeto:
```
mkdir app-de-notas-frontend
```

Acessar pasta criada:
```
cd ./app-de-notas-frontend
```

Clonar repositório:
```
git clone https://github.com/gabrieltlss/note-app-frontend.git .
```

Instalar dependências:
```
npm install
```

Ajustar variáveis de ambiente:
- Criar arquivo .env com as variáveis disponibilizadas em .env.example
- Ajustar variáveis necessárias


Execução do projeto:
```
npm run dev
```

* Este trecho executa o projeto em TSX.

Caso queira obter a versão de distribuição do projeto (em JavaScript) construído com VITE, execute:
```
npm run build
```

## Uso do projeto
O projeto pode ser executado como mostrado anteriormente. Caso queira uma opção imediata, acesse o projeto já dispnível em https://note-app.gabrieltlss.com.br/

## Contribuição
Projeto de código aberto que permite uso livre e modificações quaisquer, mas que, por sua natureza pessoal e expositiva, não aceitará contribuições neste repositório em específico.

## Autoria
Gabriel Teles ([Perfil Github](https://github.com/gabrieltlss))

Contato pelo site: https://gabrieltlss.com.br/

## Licença
Este projeto está licenciado sob a licença [MIT](./LICENSE)