# Sistema de Avaliação Académica (Projeto BD1)

Este projeto é um sistema web desenvolvido para a gestão e realização de avaliações académicas. Permite que os professores criem disciplinas, elaborem avaliações com diferentes questões e que os alunos submetam as suas respostas, acompanhando o seu desempenho através de relatórios.

## Tecnologias Utilizadas

O projeto adota uma arquitetura full-stack dividida em frontend, backend e base de dados relacional:

* **Frontend**: Desenvolvido em React.js. Responsável pela interface com o utilizador (alunos e professores) e visualização de relatórios.
* **Backend**: API RESTful desenvolvida em Java utilizando o framework Spring Boot.
* **Base de Dados**: PostgreSQL (recomendado), estruturado através de scripts SQL que gerem entidades como Usuários, Alunos, Professores, Disciplinas, Avaliações e Questões.

## Estrutura do Repositório

* `/frontend-sistema-academico`: Contém todo o código-fonte da aplicação React.
* `/sistema-academico`: Contém a aplicação backend em Java (Spring Boot).
* `/mockups_relatorio`: Imagens de referência para a construção dos *dashboards* analíticos (ex: ranking, evolução temporal, desempenho).
* `*.sql`: Scripts para a criação das tabelas e atualização da estrutura da base de dados (`script.sql`, `script_2.sql`, `script_avaliacao.sql`, `script_questao.sql`).
* `*.pdf`: Ficheiros de documentação, incluindo a descrição do projeto e diagramas relacionais e MER.

## Como Executar o Projeto

### 1. Configurar a Base de Dados
1. Crie uma base de dados no seu sistema de gestão de bases de dados (ex: PostgreSQL).
2. Execute os scripts SQL pela seguinte ordem para criar a estrutura corretamente:
   * `script.sql` (Criação inicial das tabelas)
   * `script_2.sql` (Ajustes de chaves e criação da tabela `RESPOSTA_ALUNO`)
   * `script_avaliacao.sql` e `script_questao.sql` (Configuração de *auto-increment* / IDENTITY para os IDs).

### 2. Iniciar o Backend (Spring Boot)
1. Navegue até à pasta do backend: `cd sistema-academico`.
2. Configure as credenciais da sua base de dados no ficheiro `application.properties` (este ficheiro não está no controlo de versões por segurança).
3. Execute o projeto utilizando o Maven Wrapper:
   * Em Linux/Mac: `./mvnw spring-boot:run`
   * Em Windows: `mvnw.cmd spring-boot:run`
4. A API estará disponível em `http://localhost:8080`. A configuração de CORS já permite ligações locais a partir da porta 3000.

### 3. Iniciar o Frontend (React)
1. Abra um novo terminal e navegue até à pasta do frontend: `cd frontend-sistema-academico`.
2. Instale as dependências do projeto com o comando: `npm install` (ou `yarn install`).
3. Inicie o servidor de desenvolvimento: `npm start`.
4. A aplicação abrirá automaticamente no navegador no endereço `http://localhost:3000`.

## Notas de Desenvolvimento

* **Autenticação**: Atualmente, o sistema possui um login simulado para fins de teste no frontend. Pode aceder como Professor utilizando o ID `4` ou como Aluno utilizando a Matrícula `2025001`. Numa futura atualização, será implementada a validação real com o backend e o banco de dados.
