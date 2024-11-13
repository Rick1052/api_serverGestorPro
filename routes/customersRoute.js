const express = require('express');
const router = express.Router();
const customerDb = require("../access/customers"); // Importa as funções de banco de dados
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
        const customers = await customerDb.findCustomers(filters); // Passa os filtros para a função find
        res.json(customers);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.status(500).json({ error: "Erro ao buscar os clientes" });
    }
});



router.post("/save", (req, res) => {
    const customer = req.body;
    const { name } = req.body;
    let errors = {};

    // Validação de campo nome com verificação robusta
    if (!name || typeof name !== 'string' || name.length < 3) {
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
        // Insere cliente no banco
        const result = customerDb.insertCustomers(customer); 

        // Retorna sucesso com o resultado
        res.status(200).json({
            message: "Cliente cadastrado com sucesso!",
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
        const result = await customerDb.removeCustumers(id); 
        res.json(result);  // Retorna o resultado da operação de exclusão
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao tentar excluir o dado' });
    }
});

router.put("/update", async (req, res) => {

    const id = req.body.id;
    const name = req.body.name;
    const fant = req.body.fant;
    const cod = req.body.cod;
    const selectedPessoa = req.body.selectedPessoa;
    const cpf_cnpj = req.body.cpf_cnpj;
    const contribuinte = req.body.contribuinte;
    const insc_est = req.body.insc_est;
    const ie_isent = req.body.ie_isent;
    const org_emissor = req.body.org_emissor;
    const pais = req.body.pais;
    const cep = req.body.cep;
    const ue = req.body.ue;
    const cidade = req.body.cidade;
    const bairro = req.body.bairro;
    const endereco = req.body.endereco;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const inf_cont = req.body.inf_cont;
    const fone = req.body.fone;
    const fax = req.body.fax;
    const celular = req.body.celular;
    const operadora = req.body.operadora;
    const email = req.body.email;
    const observacao = req.body.observacao;

    try {
        const result = customerDb.updateCustumers(
            id, 
            name, 
            fant,
            cod,
            selectedPessoa,
            cpf_cnpj,
            contribuinte,
            insc_est,
            ie_isent,
            org_emissor,
            pais,
            cep,
            ue,
            cidade,
            bairro,
            endereco,
            numero,
            complemento,
            inf_cont,
            fone,
            fax,
            celular,
            operadora,
            email,
            observacao
        ); 
        console.log(result);
        res.json(result);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao tentar atualizar o dado' });
    }
})

module.exports = router;