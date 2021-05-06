const dotenv = require('dotenv');
const faker = require("faker");
const path = require('path');
const uuidv4 = require('uuid/v4');

dotenv.config({ path: '.env' });

const MongoClient = require("mongodb").MongoClient;

async function seedDB() {
    
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
    });

    try {
        await client.connect();
        
        console.log("Connected to server");

        const db = client.db('frontm')

        // foodDb
        
        db.collection("fooditems").drop();
        
        foodIdCollection = [];
        foodCollection = [];
        for (let i = 0; i < 20; i++) {
            foodIdCollection[i] = uuidv4()
            let foodObj = {
                foodId : foodIdCollection[i],
                name: faker.name.firstName(),
                category: faker.random.word(),
                cuisine: faker.random.word(),
                price: parseInt(faker.datatype.number({ 'min': 20,'max': 200 }),10),
                active: true,
                createdAt: (new Date()).toUTCString(),
                updatedAt: (new Date()).toUTCString()
            }
            foodCollection.push(foodObj);
        }

        db.collection('fooditems').insertMany(foodCollection);

        
        // orderDb
        db.collection("orders").drop();

        foodQuantity = new Array(20).fill(0);
        orderCollection = [];

        for (let i = 0; i < 20; i++) {
            for(let j =i+1;j < 20; j++) {
                let quantityI = parseInt(faker.datatype.number({ 'min': 1,'max': 10 }),10)
                let quantityJ = parseInt(faker.datatype.number({ 'min': 1,'max': 10 }),10)
                foodQuantity[i] += quantityI
                foodQuantity[j] += quantityJ
                let orderObj = {
                    orderId : uuidv4(),
                    order:[
                        { foodId: foodIdCollection[i], quantity: quantityI},
                        { foodId: foodIdCollection[j], quantity: quantityJ},
                    ],
                    createdAt: (new Date()).toUTCString(),
                    updatedAt: (new Date()).toUTCString()
                }
                orderCollection.push(orderObj);
            }

        }

        db.collection('orders').insertMany(orderCollection);

        // inventory
        const redis = require("redis");
        const redisClient = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_HOST);

        redisClient.on("error", function(error) {
        console.error(error);
        });

        redisClient.flushdb( function (err, succeeded) {
            
            inventoryArr = [];

            for (let i = 0; i < foodIdCollection.length; i++) {
                inventoryArr.push(foodIdCollection[i], foodQuantity[i] + parseInt(faker.datatype.number({ 'min': 1,'max': 50 }),10))
            }

            redisClient.hmset('inventory', ...inventoryArr);
           
            redisClient.quit();
            
        });


        console.log("Database seeded sucessfully");
        
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();