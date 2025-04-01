const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para receber os dados do formulário
app.post('/submit', (req, res) => {
    try {
        const { nome, email, mensagem } = req.body;

        if (!nome || !email || !mensagem) {
            return res.status(400).json({ error: 'Preencha todos os campos.' });
        }

        // Caminho para o arquivo JSON
        const filePath = './dados.json';
        let data = [];

        // Verificar se o arquivo já existe
        if (fs.existsSync(filePath)) {
            const jsonData = fs.readFileSync(filePath, 'utf-8'); // Leia como string
            data = jsonData ? JSON.parse(jsonData) : []; // Verifique se o JSON não está vazio
        }

        // Adicionar novos dados
        data.push({ nome, email, mensagem, timestamp: new Date() });

        // Escrever os dados no arquivo
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(200).json({ success: true, message: 'Dados salvos com sucesso!' });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
