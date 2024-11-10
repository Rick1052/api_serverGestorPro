const express = require('express');
const cors = require("cors");
const customerRoutes = require('./routes/customersRoute'); // Importa as rotas de "customers"
const productRoutes = require('./routes/productRoute'); // Importa as rotas de "product"

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor rodando");
});

// Define as rotas de "customers" usando o roteador
app.use('/customers', customerRoutes);

// Define as rotas de "product" usando o roteador
app.use('/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
