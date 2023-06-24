# daily-diet-api-desafio2

## Como executar o projeto

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- Node.js (versão 16 ou superior)
- npm (geralmente vem junto com o Node.js)

Agora, siga as etapas abaixo:

1. Clone o repositório para sua máquina local:
```bash
git clone https://github.com/maiconDeSouza/daily-diet-api-desafio2.git
```

2. Acesse o diretório do projeto:
```bash
cd daily-diet-api-desafio2
```

3. Instale as dependências do projeto:
```bash
npm install
```

4. Configuração do Prisma:

- Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias, como as informações de conexão do banco de dados. OBS: o endereço do banco já está preenchido, pois ele irá criar um banco sqlite localmente na sua máquina.
    
- Execute o seguinte comando para gerar o arquivo de configuração do Prisma com base no arquivo `.env`:
```bash
npx prisma generate
```

- Execute o seguinte comando para criar as tabelas do banco de dados definidas no Prisma:
```bash
npx prisma migrate dev
```
- Ele pedirá para você dar u nome para a migrates, escolha a da sua preferencia 

5. Execute o projeto:
```bash
npm start:dev
```
- O servidor deve iniciar e estar disponível no endereço que e setou no .env para variável PORT por exemplo `http://localhost:2005.


## Usuários 

### Criar um usuário
 - Method: POST
 - Route: `/users`
 - body:
 ```json
 {
	"name": "Nome do usuário",
	"nickname":"a escolha do usuário - @un",
	"email": "email@example.com - @un",
	"password": "senha",
	"rPassword": "repetir a senha" 
 } 
 ```

### Login de usuário
- Method: POST
- Route: `/login`
- body:
```json
{
  "email": "email@example.com",
  "password": "senha"
}

```
 - Response:
 ```json
{
  "token": "token_de_autenticacao"
}
 ```

## Refeições

#### Registrar uma refeição
-   Method: POST
-   Route: `/meals`
-   Header: `"token": "token_de_autenticacao"`
-   body:
```json
{
  "name": "Nome da refeição",
  "description": "Descrição da refeição",
  "isDietMeal": true //boleano
}
```

#### Editar uma refeição
-   Method: PUT
-   Route: `/meals/:mealId`
-   Header:`"token": "token_de_autenticacao"`
-   Body:
```json
{
  "name": "Novo nome da refeição",
  "description": "Nova descrição da refeição",
  "isDietMeal": false //boleano
}
```

#### Apagar uma refeição
-   Method: DELETE
-   Route: `/meals/:mealId`
-   Header:`"token": "token_de_autenticacao"`

#### Listar todas as refeições
-   Method: GET
-   Route: `/meals`
-   Header:`"token": "token_de_autenticacao"`

#### Visualizar uma única refeição
-   Method: GET
-   Route: `/meals/:mealId`
-   Header:`"token": "token_de_autenticacao"`

#### Métricas do usuário
-   Method: GET
-   Route: `/meals/metrics`
-   Header:`"token": "token_de_autenticacao"`
-   Response:
 ```json
{
  "totalMeals": 10, 
  "dietMeals": 7, 
  "nonDietMeals": 3,
  "bestDietSequence": 5
}
 ```


## Banco de Dados

### Tabela de Usuários:

| Campo    | Tipo    | único |
| -------- | ------- | ------|
| id       | String  | True  |
| name     | String  | false |
| nickname | String  | true  |
| email    | String  | True  |
| password | String  | false |

### Tabela de Refeições:

| Campo       | Tipo     | único |
| ----------- | -------- | ----- |
| id          | String   | True  |
| userId*     | String   | True  |
| name        | String   | false |
| description | String   | false |
| datetime    | DateTime | false |
| isDietMeal  | Boolean  | false |

\*UseID - vem da tabela usuários
\*Todos os campos serão obrigatórios

## Todolist
- Banco
- [x] Criar Banco - obs: nunca criei dois duas tabelas que se relacionam.

- Usuários 
- [x] Criar um usuário
- [x] Login de usuário

- Refeições
- [x] Registrar uma refeição
- [x] Editar uma refeição
- [x] Listar todas as refeições
- [x] Visualizar uma única refeição
- [x] Deletar uma refeição
- [x] Métricas do usuário

## Relátório do Projeto
---
### Relatório Diário - Dia 1 - 18-06-23

Hoje, aproveitei o final da tarde e o início da noite para iniciar a criação deste README. Esta é a primeira vez que tento planejar um projeto antes de começar a implementá-lo, então não tenho certeza se a estrutura que estou usando no README é a melhor forma de organizar o projeto.

Quanto às tecnologias, estou considerando utilizar as seguintes para criar esta API:

- Fastify
- TypeScript
- Prisma com banco de dados SQLite

Observação: No projeto anterior da API de tarefas, utilizei o Prisma com sucesso, mesmo que esse seja um assunto que veremos mais adiante no curso. Decidi utilizá-lo novamente por sua eficiência e praticidade.

 Acredito que isso seja tudo por hoje. Caso eu tenha esquecido de mencionar algo, vou atualizar este README, que funcionará como um diário do meu projeto.
----
### Relatório Diário - Dia 2 - 19-06-23

Provavelmente vou dividir os relatórios em partes durante o dia, sempre que eu tiver tempo para codar (geralmente de manhã e à noite).

#### Primeira Parte
Percebi que esqueci de mencionar o uso do JWT (JSON Web Token). Vou precisar assistir alguns vídeos tutoriais para aprender a usar essa biblioteca. Atualização das tecnologias que vou usar:

- Fastify
- TypeScript
- Prisma com banco de dados SQLite
- Zod (uma biblioteca de validação de tipos)
- JWT (JSON Web Token)

Estou planejando incorporar o uso do JWT para lidar com autenticação e autorização na API. Aparentemente é mais utilizado.

Além disso, decidi utilizar a biblioteca Zod para fazer a validação dos tipos de dados na API. Isso ajudará a garantir a integridade dos dados que serão recebidos e enviados pela API.

#### Segunda Parte

Durante esta segunda parte, tive um tempo limitado disponível, mas consegui concluir a primeira rota de criação de usuário. Para garantir a segurança da senha, utilizei a biblioteca nativa do Node.js para criptografia. Esta é a primeira vez que utilizo essa biblioteca, já que em projeto anterior eu havia utilizado o Bcrypt.

Agora, o próximo passo será implementar a lógica para autenticação de usuário e geração de tokens JWT. Para isso, vou explorar mais sobre a biblioteca JWT e buscar exemplos e tutoriais que me auxiliem na implementação correta.

Continuarei atualizando este README com informações diárias sobre o progresso do projeto.

### Relatório Diário - Dia 3 - 24-06-23

Passei alguns dias sem conseguir mexer no projeto, mas consegui finalizá-lo.

Entreguei com todas as funcionalidades solicitadas. 

Tecnologias usadas:
- **Fastify** como framework web;
- **@fastify/jwt** para permitir que apenas pessoas logadas possam cadastrar refeições e que cada pessoa tenha acesso apenas às suas refeições - ainda não foi um assunto abordado no curso, mas pesquisei e fiz;
- **Prisma** para banco de dados - também foi um assunto ainda não abordado no curso, mas aprendi vendo alguns tutoriais;
- **Zod** para validação de dados;
- **TypeScript**, claro que não podia faltar. Estou mais acostumado a usar TS e com certeza ajuda muito!

Acredito que são apenas essas tecnologias, acho que não estou esquecendo de nada. 

Gostei muito desse desafio e realmente a Rocketseat é muito diferente do resto do mercado! 