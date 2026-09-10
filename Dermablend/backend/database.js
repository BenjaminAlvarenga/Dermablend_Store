import mongoose from "mongoose"
import { config } from "./src/config.js";

mongoose.connect(config.db.URI).catch((error) => {
    console.log("Could not connect to the database: " + error.message)
})

//Comprobar que todo funciona
const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("DB is connected")
})
connection.on("disconnected", ()=>{
    console.log("DB is disconnected")
})

connection.on("error", (error)=>{
    console.log("error found" + error)
})