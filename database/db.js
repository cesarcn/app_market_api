const {MongoClient} = require("mongodb");
//const { response } = require("../app");
const client = new MongoClient("mongodb+srv://CesarC:root2022@cluster0.mgfgs.mongodb.net/?retryWrites=true&w=majority");

client.connect().then(
    (response) => {
        console.log('La conexion a la bd es correcta -url:'+ response.url);
    },
    (error) => {
        console.log('error:' + error);
    }
)

// EXPORTAR MODULO
module.exports = client;