const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar corpos de solicitação
app.use(bodyParser.json());

// Rota de login
app.post('/v1/login', (req, res) => {
    const { email, password } = req.body;

    // Aqui você pode fazer a autenticação do usuário com as credenciais fornecidas
    // Simulando uma resposta de sucesso para demonstração
    res.status(200).json({ message: 'Login successful', email });
});

// Rota de registro
app.post('/v1/register', (req, res) => {
    const { email, password } = req.body;

    // Aqui você pode salvar as credenciais do usuário no banco de dados
    // Simulando uma resposta de sucesso para demonstração
    res.status(201).json({ message: 'Registration successful', email });
});

// Lidando com rotas não encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Lidando com erros internos do servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
