import  express  from "express";

const router = express.Router();

import {Books, BooksRented, Customer } from "../models/book.mjs";
import exp from "constants";


//post a book for rent
router.post('/', async(req,res) => {   //remove

    try {
        const data1 = await req.body;

        const book = await Books.findById(data1.bookId);
        const customer = await Customer.findById(data1.customerId);

        if(book && customer)
        {
        const data = await BooksRented.create({...req.body, isActive : true,dateOfRental : Date.now() });
        console.log(`A Rental has been added to database`);
        res.status(200).send(data);    
       }
        else
        {
            res.status(404).send(`Customer or Book not found`)
        }
        
        
    } catch (error) {

        res.sendStatus(500);
        console.log(`Error creating a new customer`,error);
        
    }
})



// get a book for rent

//get details of customer by id
router.get('/:rentalId', async(req,res) => {
    try {

        const data = await BooksRented.findById(req.params.rentalId);
        
        console.log('A book rental informattion is retrieved');
        res.status(200).send(data);
        
    } catch (error) {
        
        res.status(500);
        console.log(`error retrieving by Id`,error);
    }
})


//update the status of rental from isactive true to isactve false or update date of rental
router.patch('/:rentalId', async(req,res) => {

    try {
        const updatedData = await  BooksRented.findByIdAndUpdate(req.params.rentalId,req.body);
        if(!updatedData)
        {
            return res.status(404).json({ message: 'Rental information not found not found' });    
        }
        console.log('Rental information updated successfully');
        res.status(200).send('Rental information updated successfully');

    } catch (error) {
        res.status(500)
        console.log('Error occured in updating Customer',error)
    }
})

// Delete the rented book

router.delete('/:rentalId', async( req,res) => {

    try {
        const data =  await BooksRented.findById(req.params.rentalId)

        if(!data?.isActive)
        {
            await BooksRented.deleteOne({_id: req.params.rentalId})
            res.status(200).send(`Rental Deleted successfully`)
        }
        else
        {
             
             res.status(200).send(`Clear your rent for deletion`)
        }

        
    } catch (error) {
        
        res.status(500)
        console.log(`Error occur while deleation`, error)
    }
})


export {router as rentalRouter};