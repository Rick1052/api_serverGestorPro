const connect = require('../db/connection')
const { ObjectId } = require("mongodb");

//  CRUD CUSTOMERS

// Função para inserir um cliente na coleção "customers"
async function insertCustomers(customer) {
    const db = await connect(); // Chame a função connect() corretamente aqui
    return db.collection("customers").insertOne(customer);
}


// Função find com suporte a filtros
async function findCustomers(filters) {
    const db = await connect(); // Chama a função connect() para se conectar ao banco
    return db.collection("customers").find(filters).toArray(); // Aplica os filtros na consulta
}

async function removeCustumers(id) {
    const db = await connect();
    return db.collection("customers").deleteOne({ _id: new ObjectId(id) });
}

async function updateCustumers(
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
) {
    const db = await connect();
    return db.collection("customers").updateOne({ _id: new ObjectId(id) }, {
        $set: {
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
        }
    })
}

module.exports = {
    insertCustomers,
    findCustomers,
    removeCustumers,
    updateCustumers
}; 
