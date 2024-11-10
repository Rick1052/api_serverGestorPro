const express = require('express');
const router = express.Router();
const productDb = require("../access/product"); // Importa as funções de banco de dados
const { ObjectId } = require('mongodb');

router.get("/", async (req, res) => {
    const filters = {};
    
    if (req.query.id) {
        filters._id = new ObjectId (req.query.id);
    }

    if (req.query.nome) {
        // Usando RegExp para fazer a busca case-insensitive
        filters.nome = new RegExp(req.query.nome, "i"); // "i" faz a busca insensível ao caso
    }

    try {
        const product = await productDb.findProduct(filters); // Passa os filtros para a função find
        res.json(product);
    } catch (error) {
        console.error("Erro ao buscar o produto:", error);
        res.status(500).json({ error: "Erro ao buscar os produtos" });
    }
});



router.post("/save", (req, res) => {
    const product = req.body;
    const { name_product } = req.body;
    let errors = {};

    // Validação de campo nome com verificação robusta
    if (!name_product || typeof name_product !== 'string' || name_product.length < 3) {
        errors.name = "Nome deve ter pelo menos 3 caracteres.";
    }

    // Se houver erros, envia a resposta com código de erro 400 e lista de erros
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: errors,
        });
    }

    try {
        // Insere produto no banco
        const result = productDb.insertProduct(product); 

        // Retorna sucesso com o resultado
        res.status(200).json({
            message: "Produto cadastrado com sucesso!",
            result: result,
        });
    } catch (error) {
        // Retorna erro 500 se houver problemas no banco de dados ou outros
        res.status(500).json({
            message: "Erro ao salvar cliente. Tente novamente.",
            error: error.message,
        });
    }
});


router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await productDb.removeProduct(id); 
        console.log(result);
        res.json(result);  // Retorna o resultado da operação de exclusão
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao tentar excluir o dado' });
    }
});

router.put("/update", async (req, res) => {

    const id = req.body.id;
    const name_product = req.body.name_product;
    const un_product = req.body.un_product;
    const custo_product = req.body.custo_product;
    const preco_product = req.body.preco_product;
    const estoque_product = req.body.estoque_product;

    try {
        const result = productDb.updateCustumers(
            id, 
            name_product,
            un_product,
            custo_product,
            preco_product,
            estoque_product
        ); 
        console.log(result);
        res.json(result);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao tentar atualizar o dado' });
    }
})

module.exports = router;