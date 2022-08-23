const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  //A rota deve receber title, url e techs pelo corpo da requisição e retornar um objeto com as informações do repositório criado e um status 201
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  //A rota deve receber title, url e techs pelo corpo da requisição e o id do repositório que deve ser atualizado pelo parâmetro da rota. Deve alterar apenas as informações recebidas pelo corpo da requisição e retornar esse repositório atualizado.
  const { id } = request.params;
  const updatedRepository = request.body;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  
  if(updatedRepository.likes != undefined) {
    updatedRepository.likes = repositories[repositoryIndex].likes
  }

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  //A rota deve receber, pelo parâmetro da rota, o id do repositório que deve ser excluído e retornar um status 204 após a exclusão.
  const { id } = request.params;
 
  repositoryIndex = repositories.findIndex(repository => repository.id === id);
  console.log(repositoryIndex);
  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.sendStatus(204);
});

app.post("/repositories/:id/like", (request, response) => {
 // A rota deve receber, pelo parâmetro da rota, o id do repositório que deve receber o like e retornar o repositório com a quantidade de likes atualizada.
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
