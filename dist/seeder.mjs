import { Customer } from "./mongodb/models/book.mjs";
// Example data to insert
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();
const port = 8000;
const MongoDB_connection_string = process.env.DB_URI; //"mongodb+srv://alimehndi99:alimehndi99@cluster0.alv9hi3.mongodb.net/new"
console.log(MongoDB_connection_string);
async function connectToMongoDb(connectionString) {
    await mongoose.connect(connectionString);
    console.log("Connected To MongoDb database");
}
try {
    await connectToMongoDb(MongoDB_connection_string);
}
catch (e) {
    console.log("error connecting to database", e);
}
const exampleData = [
    {
        _id: "customer1",
        rentals: [
            { booktype: "regular", noOfDaysRented: 3 },
            { booktype: "fiction", noOfDaysRented: 2 },
            { booktype: "novel", noOfDaysRented: 4 }
        ]
    },
    {
        _id: "customer2",
        rentals: [
            { booktype: "regular", noOfDaysRented: 5 },
            { booktype: "fiction", noOfDaysRented: 3 }
        ]
    },
    {
        _id: "customer3",
        rentals: [
            { booktype: "novel", noOfDaysRented: 1 }
        ]
    },
    // Add more examples as needed
];
// Insert example data into MongoDB
async function insertExampleData() {
    try {
        await Customer.deleteMany({}); // Clear existing data
        for (const data of exampleData) {
            await Customer.create(data);
        }
        console.log("Example data inserted successfully.");
    }
    catch (error) {
        console.error("Error inserting example data:", error);
    }
}
insertExampleData();
