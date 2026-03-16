// configure our enviroment variables
import 'dotenv/config'

import express from "express"
// bring in the MongoClient to help with the connection
import { MongoClient } from 'mongodb'

// assign the connection string to a variable
const connectionString = process.env.MONGO_URI

// create an instance of the client for the initial connection
const client = new MongoClient(connectionString)

// make an async function to handle the connection (and any errors)
async function conncetDB() {
    try{
        // connect client to the server 
        await client.connect()
        // Establish and verify connection
        await client.db("admin").command({ping: 1})
        console.log("Connection successefully  to MongoDB")
    }catch (error) {
        console.error("MongoDB connection error:", error)
    }
}

conncetDB()

const app = express()
const port = process.env.PORT

app.get('/', async (req, res) => {
    try {
        await client.db("admin").command({ ping: 1 });

        res.status(200).json({
            message: "Successfully connected to the database!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to connect to the database."
        });
    }
})

app.listen(port, () => {
    console.log('listening on port: ', port)
})