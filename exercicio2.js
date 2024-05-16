const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Simulação de banco de dados de eventos
let eventos = [];

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
