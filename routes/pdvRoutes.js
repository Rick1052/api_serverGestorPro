// pdvRoutes.js - Rotas relacionadas ao recurso "pdv"

const express = require('express'); // Importação do Express
const router = express.Router(); // Criação do roteador do Express
const pdvDb = require("../access/pdv"); // Importa as funções de banco de dados
const { ObjectId } = require('mongodb'); // Conversão de ID para o formato MongoDB


// Rota para obter o próximo número de venda
router.get('/nextpdv', async (req, res) => {
    try {
        const nextPdv = await pdvDb.nextPdv();

        res.json({ nextPdv }); // Envia o próximo número de venda como resposta
    } catch (error) {
        console.error("Erro ao buscar o número da próxima venda:", error);
        res.status(500).send("Erro ao buscar número de venda");
    }
});

// Rota para obter dados de PDV com filtros
router.get("/", async (req, res) => {
    const filters = {};
    
    if (req.query.id) {
        filters._id = new ObjectId (req.query.id); // Filtro por ID
    }

    try {
        const pdv = await pdvDb.findPdv(filters); // Passa os filtros para a função find
        res.json(pdv);
    } catch (error) {
        console.error("Erro ao buscar o pdv:", error);
        res.status(500).json({ error: "Erro ao buscar os pdv" });
    }
});

// Rota para salvar dados de PDV
router.post("/save", (req, res) => {
    const pdv = req.body;

    try {
        // Insere produto no banco
        const result = pdvDb.insertPdv(pdv); 

        // Retorna sucesso com o resultado
        res.status(200).json({
            message: "Pdv cadastrado com sucesso!",
        });
    } catch (error) {
        // Retorna erro 500 se houver problemas no banco de dados ou outros
        res.status(500).json({
            message: "Erro ao salvar pdv. Tente novamente.",
            error: error.message,
        });
    }
});


router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pdvDb.removePdv(id); 
        console.log(result);
        res.json(result);  // Retorna o resultado da operação de exclusão
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao tentar excluir o dado' });
    }
});

router.put("/update", async (req, res) => {

    const id = req.body._id;
    const productData = req.body.productData;
    const totalData = req.body.totalData;
    const detalheVenda = req.body.detalheVenda;
    const headerPdv = req.body.headerPdv;

    try {
        const result = pdvDb.updatePdv(
            id, 
            productData,
            totalData,
            detalheVenda,
            headerPdv,
        ); 
        console.log(result);
        res.json(result);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao tentar atualizar o dado' });
    }
})

module.exports = router;
