const { response } = require('express');
const express = require('express');
const { uuid } = require('uuidv4'); // id
const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log('Escutando o back-end');
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
    projects.splice(id, 1);
    return response.json('Removido com sucesso');
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { projeto, author, idade } = request.body;

    const projectID = projects.findIndex(item => item.id == id);

    if (projectID) {
        projects.splice(id, 1, {
            id,
            projeto,
            author,
            idade
        })
        return response.json('Usuario editado com sucesso!')
    }

    return response.status(400).json({ error: 'Project not found.' });
})

