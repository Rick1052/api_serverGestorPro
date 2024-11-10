require("dotenv").config();
const { MongoClient } = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    try {
        // Conectando ao banco de dados MongoDB sem as opções obsoletas
        const client = new MongoClient(process.env.MONGO_HOST);
        await client.connect();
        
        singleton = client.db(process.env.MONGO_DATABASE);
        return singleton;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
}

module.exports = connect;