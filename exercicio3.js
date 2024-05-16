const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Simulação de banco de dados de eventos e notas
let eventos = [];
let notas = [];

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());

// Simulação de middleware de autenticação de usuário
function authenticateUser(req, res, next) {
    // Aqui você pode implementar a lógica de autenticação do usuário
    // Neste exemplo, estou apenas permitindo que todas as solicitações passem
    next();
}

// Rota para obter todos os eventos
app.get('/v1/eventos', authenticateUser, (req, res) => {
    // Retorna todos os eventos
    res.status(200).json(eventos);
});

// Rota para adicionar um novo evento
app.post('/v1/evento', authenticateUser, (req, res) => {
    const { nome, data, descricao } = req.body;

    // Adiciona o novo evento ao array de eventos
    const novoEvento = { id: eventos.length + 1, nome, data, descricao };
    eventos.push(novoEvento);

    res.status(201).json({ message: 'Evento adicionado com sucesso', evento: novoEvento });
});

// Rota para atualizar um evento existente
app.put('/v1/evento/:id', authenticateUser, (req, res) => {
    const eventId = parseInt(req.params.id);
    const { nome, data, descricao } = req.body;

    // Procura o evento pelo ID
    const eventoIndex = eventos.findIndex(evento => evento.id === eventId);

    if (eventoIndex !== -1) {
        // Atualiza os dados do evento
        eventos[eventoIndex] = { id: eventId, nome, data, descricao };
        res.status(200).json({ message: 'Evento atualizado com sucesso', evento: eventos[eventoIndex] });
    } else {
        res.status(404).json({ message: 'Evento não encontrado' });
    }
});

// Rota para deletar um evento
app.delete('/v1/evento/:id', authenticateUser, (req, res) => {
    const eventId = parseInt(req.params.id);

    // Filtra o array de eventos para encontrar o evento com o ID especificado
    eventos = eventos.filter(evento => evento.id !== eventId);

    res.status(200).json({ message: 'Evento deletado com sucesso' });
});

// Rota para adicionar uma nova nota
app.post('/v1/notes', authenticateUser, (req, res) => {
    const { content } = req.body;

    // Adiciona a nova nota ao array de notas
    const novaNota = { id: notas.length + 1, content };
    notas.push(novaNota);

    res.status(201).json({ message: 'Nota adicionada com sucesso', nota: novaNota });
});

// Rota para listar todas as notas
app.get('/v1/notes', authenticateUser, (req, res) => {
    // Retorna todas as notas
    res.status(200).json(notas);
});

// Rota para listar notas por evento
app.get('/v1/events/:eventId/notes', authenticateUser, (req, res) => {
    const eventId = parseInt(req.params.eventId);

    // Filtra o array de notas para encontrar notas associadas ao evento com o ID especificado
    const notasEvento = notas.filter(nota => nota.eventId === eventId);

    res.status(200).json(notasEvento);
});

// Rota para atualizar uma nota existente
app.put('/v1/notes/:id', authenticateUser, (req, res) => {
    const noteId = parseInt(req.params.id);
    const { content } = req.body;

    // Procura a nota pelo ID
    const noteIndex = notas.findIndex(nota => nota.id === noteId);

    if (noteIndex !== -1) {
        // Atualiza os dados da nota
        notas[noteIndex] = { id: noteId, content };
        res.status(200).json({ message: 'Nota atualizada com sucesso', nota: notas[noteIndex] });
    } else {
        res.status(404).json({ message: 'Nota não encontrada' });
    }
});

// Rota para excluir uma nota
app.delete('/v1/notes/:id', authenticateUser, (req, res) => {
    const noteId = parseInt(req.params.id);

    // Filtra o array de notas para encontrar a nota com o ID especificado
    notas = notas.filter(nota => nota.id !== noteId);

    res.status(200).json({ message: 'Nota excluída com sucesso' });
});

// Lidando com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Lidando com erros internos do servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
