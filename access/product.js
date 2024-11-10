const connect = require('../db/connection')
const { ObjectId } = require("mongodb");

//  CRUD PRODUCT

// Função para inserir um cliente na coleção "product"
async function insertProduct(product) {
    const db = await connect(); // Chame a função connect() corretamente aqui
    return db.collection("product").insertOne(product);
}

// Função find com suporte a filtros
async function findProduct(filters) {
    const db = await connect(); // Chama a função connect() para se conectar ao banco
    return db.collection("product").find(filters).toArray(); // Aplica os filtros na consulta
}

async function removeProduct(id) {
    const db = await connect();
    return db.collection("product").deleteOne({ _id: new ObjectId(id) });
}

async function updateProduct(
    id,
    name_product,
    un_product,
    custo_product,
    preco_product,
    estoque_product
) {
    const db = await connect();
    return db.collection("product").updateOne({ _id: new ObjectId(id) }, {
        $set: {
            name_product,
            un_product,
            custo_product,
            preco_product,
            estoque_product
        }
    })
}

module.exports = {
    insertProduct,
    findProduct,
    removeProduct,
    updateProduct
}; 
