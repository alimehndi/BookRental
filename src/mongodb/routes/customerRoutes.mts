import  express  from "express";

const router = express.Router();

import { BooksRented, Customer } from "../models/book.mjs";


//add a  customer
router.post('/', async(req,res) => {  // remove add customer

    try {
        console.log(req.body)
        const data = await Customer.create(req.body);
        console.log(`A customer has been added to database`);
        console.log(data);
        res.status(200).send(data);
        
    } catch (error) {

        res.sendStatus(500);
        console.log(`Error creating a new customer`,error);
        
    }
})

//get details of customer by id
router.get('/:customerId', async(req,res) => {  //remove getCustmer
    try {

        const data = await Customer.findById(req.params.customerId);
        console.log('A Customer is retrieved by ID');
        res.status(200).send(data);

        
    } catch (error) {
        
        res.status(500);
        console.log(`error retrieving by Id`,error);
    }
})


// update a Customer
router.put('/:customerId', async(req,res) => {  // add put 

    try {
        const updatedData = await  Customer.findByIdAndUpdate(req.params.customerId,req.body,{new :true});
        if(!updatedData)
        {
            return res.status(404).json({ message: 'User not found' });    
        }
        console.log('Customer Updated Successfully');
        res.status(200).send(updatedData);

    } catch (error) {
        res.status(500)
        console.log('Error occured in updating Customer',error)
    }
})

// delete a Customer

router.delete('/:customerId', async( req,res) => { //remove deleteCustomer

    try {
        const booksRentedStatus  = await BooksRented.find({customerId : req.params.customerId, isActive : true})
        if(booksRentedStatus.length !== 0)
        {
            res.status(200).send(`Clear your rent for deletion`)
        }
        else
        {
             await Customer.deleteOne({_id: req.params.customerId});
             await BooksRented.deleteMany({customerId:req.params.customerId});
             res.status(200).send(`Customer deleted successfully`)
        }

        
    } catch (error) {
        
        res.status(500)
        console.log(`Error occur while deleation`, error)
    }
})

export {router as customerRouter};