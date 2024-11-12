const connect = require('../db/connection')
const { ObjectId } = require("mongodb");

// Dados Pedido de venda
// - Dados do cliente
//     * idCliente
// - Produto 
//     * idProduto
//     * qntd_prod
//     * valor_prod

// - Valor total de venda
// -
// - data de venda
// - data de saida
// - data prevista
// - situacao pedido
// - numero do pedido 

// Função para verificar o proximo
async function nextPdv() {
    const db = await connect(); // Conectando ao banco de dados
    const totalPedidos = await db.collection("pdv").countDocuments(); // Conta os documentos na coleção "pdv"
    
    const nextVendaNumber = totalPedidos + 1; // O próximo número de venda será o número total de pedidos + 1
    return nextVendaNumber; // Retorna o próximo número de venda
}
// Função para inserir um pdv na coleção "pdv"
async function insertPdv(pdvData) {
    const db = await connect(); // Chame a função connect() corretamente aqui
    return db.collection("pdv").insertOne(pdvData);
}

// Função find com suporte a filtros
async function findPdv(filters) {
    const db = await connect(); // Chama a função connect() para se conectar ao banco
    return db.collection("pdv").find(filters).toArray(); // Aplica os filtros na consulta
}

async function removePdv(id) {
    const db = await connect();
    return db.collection("product").deleteOne({ _id: new ObjectId(id) });
}

async function updatePdv(
    id,
    productData,
    totalData,
    detalheVenda,
    headerPdv,
) {
    const db = await connect();
    return db.collection("product").updateOne({ _id: new ObjectId(id) }, {
        $set: {
            productData,
            totalData,
            detalheVenda,
            headerPdv,
        }
    })
}

module.exports = {
    insertPdv,
    findPdv,
    nextPdv,
    updatePdv,
    removePdv
}; 
