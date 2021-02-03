const MongoClient = require('mongodb').MongoClient;



export function databaseConnect(database, collection){
    let db = client.db(database);
    let collection = db.collection(collection)
    mongoClient.connect(function (err, client) {
        
    })
}