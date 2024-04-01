import  express  from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {IBooksRented ,BooksRented , Customer } from "./mongodb/models/book.mjs";
import {calculateTotalRentalCharges1,calculateTotalRentalCharges2,calculateTotalRentalCharges3} from "./calculations/calculateRentByCustomerId.mjs" ;
import { bookRouter } from "./mongodb/routes/bookRoutes.mjs";
import { customerRouter } from "./mongodb/routes/customerRoutes.mjs";
import { rentalRouter } from "./mongodb/routes/rentalRoutes.mjs";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { calculateTotalRentalCharges1FromRentalId, calculateTotalRentalCharges2FromRentalId,calculateTotalRentalCharges3FromRentalId } from "./calculations/calculateRentbyRentalId.mjs";
import connectDB from "./mongodb/connectDB.mjs";
dotenv.config();
const port =8000;
//connection to Database
connectDB();

export const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use(cors());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// app.listen(port, () => {
//     console.log(`[server]: Server is running at http://localhost:${port}`);
// });

app.use('/api/books',bookRouter); 
app.use('/api/customer',customerRouter); 
app.use('/api/rental',rentalRouter); 

//Calculate Rental charges based on the rental id
app.get('/rental/:rentalId' , async (req , res ) => {
    try {
        const rentalId : string = req.params.rentalId;
        const rental = await BooksRented.findById(rentalId);
        
        if(!rental)
        {
            return res.status(404).json({error: 'Rental Information not found'})
        }
        const totalCharges1 = await calculateTotalRentalCharges1FromRentalId(rentalId);
        const totalCharges2 = await calculateTotalRentalCharges2FromRentalId(rentalId);
        const totalCharges3 = await calculateTotalRentalCharges3FromRentalId(rentalId);
        

        res.status(200).json({ rentalId, totalCharges1 ,totalCharges2 , totalCharges3 });
    } catch (error) {
        console.error('Error calculating rental charges:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


})



// Route to calculate total rental charges for all rentals of a customer
app.get('/customer/:customerId', async (req, res) => {
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