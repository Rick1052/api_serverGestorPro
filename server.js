// server.js - Arquivo principal do servidor
const express = require('express'); // Importação do framework Express
const cors = require("cors"); // Middleware para habilitar CORS
const customerRoutes = require('./routes/customersRoute'); // Importa as rotas de "customers"
const productRoutes = require('./routes/productRoute'); // Importa as rotas de "product"
const pdvRoutes = require('./routes/pdvRoutes'); // Importa as rotas de "pdv"

const app = express(); // Instância do aplicativo Express
const PORT = 8000; // Definição da porta do servidor

// Middleware global para habilitar CORS e processamento de JSON
app.use(cors());
app.use(express.json());

// Rota principal do servidor
app.get('/', (req, res) => {
    res.send("Servidor rodando");
});

// Define as rotas de "customers" usando o roteador
app.use('/customers', customerRoutes);

// Define as rotas de "product" usando o roteador
app.use('/product', productRoutes);

// Define as rotas de "pdv" usando o roteador
app.use('/pdv', pdvRoutes);

// Inicialização do servidor na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
