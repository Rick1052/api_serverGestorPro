// connection.js - Configuração de conexão com o banco de dados

require("dotenv").config(); // Carregamento das variáveis de ambiente
const { MongoClient } = require("mongodb"); // Importação do cliente MongoDB

let singleton; // Variável para implementar o padrão Singleton

async function connect() {
    if (singleton) return singleton; // Retorna a instância única se já estiver definida

    try {
        // Conectando ao banco de dados MongoDB sem as opções obsoletas
        const client = new MongoClient(process.env.MONGO_HOST);
        await client.connect();
        
        singleton = client.db(process.env.MONGO_DATABASE); // Define a instância do banco de dados
        return singleton; // Retorna a conexão estabelecida
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error); // Retorna erro
        throw error;
    }
}

module.exports = connect; // Exporta a função de conexão
