const express = require('express');
const { uuid } = require('uuidv4'); // id
const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log('Listen back-end');
})

/**
  * Tipos de parâmetros:
  *
  * Query Params: Filtros e paginação
  * Route Params: Identificar recursos (Atualizar/Deletar)
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
  */

let projects = [];

app.get('/projects', (request, response) => {
    return response.json(projects)
})

app.post('/projects', (request, response) => {
    const { projeto, author, idade } = request.body;
    projects.push({
        id: uuid(),
        projeto,
        author,
        idade,
    });
    return response.json(projects)
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const findIndex = projects.findIndex(item => item.id === id);

    if (findIndex < 0) {
        return response.status(400).json('Este projeto não existe');
    }
    projects.splice(findIndex, 1);
    return response.status(204).json('Projeto removido com sucesso');
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { projeto, author, idade } = request.body;

    const findIndex = projects.findIndex(item => item.id == id);

    if (findIndex < 0) {
        return response.status(400).json({ error: 'Projeto não existe' });
    }
    projects.splice(findIndex, 1, {
        id,
        projeto,
        author,
        idade
    })
    return response.json('Projeto editado com sucesso!');
})

