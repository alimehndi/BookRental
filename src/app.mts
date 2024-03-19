import  express  from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {BooksRented , Customer } from "./mongodb/models/book.mjs";
import {calculateTotalRentalCharges1,calculateTotalRentalCharges2,calculateTotalRentalCharges3} from "./calculations/calculateRent.mjs" ;
import { bookRouter } from "./mongodb/routes/book.routes.mjs";
import { customerRouter } from "./mongodb/routes/customer.routes.mjs";
import { rentalRouter } from "./mongodb/routes/rentalRoutes.mjs";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { calculateTotalRentalCharges1FromRentalId, calculateTotalRentalCharges2FromRentalId,calculateTotalRentalCharges3FromRentalId } from "./calculations/calculateRentbyRental.mjs";

dotenv.config();
// Define interface for books rented
interface IBooksRented extends Document {
    booktype: string;
    noOfDaysRented: number;
}
 
const port =8000;

const MongoDB_connection_string = process.env.DB_URI as string; //"mongodb+srv://alimehndi99:alimehndi99@cluster0.alv9hi3.mongodb.net/new"

console.log(MongoDB_connection_string);

async function connectToMongoDb(connectionString: string) {
    await mongoose.connect(connectionString);
    console.log("Connected To MongoDb database");
}

try {
    await connectToMongoDb(MongoDB_connection_string);
}
catch (e) {
    console.log("error connecting to database", e);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use(cors());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use('/api',bookRouter); // /books 
app.use('/api',customerRouter); // /customer
app.use('/api/rental',rentalRouter); // rental

//Calculate Rental charges based on the rental id
app.get('/:rentalId' , async (req , res ) => {
    try {
        const rentalId : string = req.params.rentalId;
        const rental = await BooksRented.findById(rentalId);
        
        if(!rental)
        {
            return res.status(404).json({error: 'Rental Information not found'})
        }
        const totalCharges1 = await calculateTotalRentalCharges1(rentalId);
        const totalCharges2 = await calculateTotalRentalCharges2(rentalId);
        const totalCharges3 = await calculateTotalRentalCharges3(rentalId);
        

        res.status(200).json({ rentalId, totalCharges1 ,totalCharges2 , totalCharges3 });
    } catch (error) {
        console.error('Error calculating rental charges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


})



// Route to calculate total rental charges for all rentals of a customer
app.get('/calculate-charges/:customerId', async (req, res) => {
    try {
        // Retrieve customer ID from URL parameter
        const customerId: string = req.params.customerId;

        // Retrieve customer from MongoDB
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        

        // Calculate total rental charges
        const totalCharges1 = await calculateTotalRentalCharges1(customerId);
        const totalCharges2 = await calculateTotalRentalCharges2(customerId);
        const totalCharges3 = await calculateTotalRentalCharges3(customerId);
        

        res.status(200).json({ customerId, totalCharges1 ,totalCharges2 , totalCharges3 });
    } catch (error) {
        console.error('Error calculating rental charges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});