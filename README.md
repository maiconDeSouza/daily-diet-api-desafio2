# daily-diet-api-desafio2

## Usuários 

### Criar um usuário
 - Method: POST
 - Route: `/users`
 - body:
 ```json
 {
	"id": "uuid - @un",
	"name": "Nome do usuário",
	"nickname":"a escolha do usuário - @un",
	"email": "email@example.com - @un",
	"password": "senha" 
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
-   Route: `/login`
-   Header: `"token": "token_de_autenticacao"`
-   body:
```json
{
  "id":"uuid",
  "name": "Nome da refeição",
  "description": "Descrição da refeição",
  "datetime": "2023-05-15T12:00:00",
  "isDietMeal": true
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
  "datetime": "2023-05-16T08:30:00",
  "isDietMeal": false
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
- [ ] Criar Banco - obs: nunca criei dois duas tabelas que se relacionam.

- Usuários 
- [ ] Criar um usuário
- [ ] Login de usuário

- Refeições
- [ ] Registrar uma refeição
- [ ] Editar uma refeição
- [ ] Listar todas as refeições
- [ ] Visualizar uma única refeição
- [ ] Métricas do usuário

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