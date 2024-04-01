import  express  from "express";
const router = express.Router();

import { Books,BooksRented } from "../models/book.mjs";
//Add a book
router.post('/', async (req,res) => {
    try {
        const data = await Books.create(req.body);
        console.log(`A book has been added to database`);
        res.status(200).send(data);
        console.log(data);
    } catch (error) {
        res.status(500)
        console.log('Error creating a Book',error);
    }
})


router.get('/:bookId', async (req,res) => {
    try {
        const data = await Books.findById(req.params.bookId)
        if(!data)
        {
            res.status(500); 
        }else{
        console.log(`A book is retrieved by Id`);
        res.status(200).send(data);
        }
    } catch (error) {
        res.status(500)
        console.log('Error retirieving by Id', error);
        
    }
})


router.put('/:bookId', async (req,res) => {
    try {
        const updatedData = await  Books.findByIdAndUpdate(req.params.bookId,req.body,{new:true});
        if(!updatedData)
        {
            return res.status(404).json({ message: 'User not found' });    
        }
        console.log('Books Updated Successfully');
        res.status(200).send(updatedData);
    } catch (error) {
        res.status(500)
        console.log('Error occured in updating Book',error)
    }
})


// delete a Customer

router.delete('/:bookId', async( req,res) => {
    try {
        const booksRentedStatus  = await BooksRented.find({bookId: req.params.bookId, isActive : true})
        if(booksRentedStatus.length != 0)
        {
            res.status(200).send(`Clear your rent for deletion`)
        }
        else
        {
             await Books.deleteOne({"_id" : req.params.bookId});
             await BooksRented.deleteMany({bookId:req.params.bookId});
             res.status(200).send(`Customer deleted successfully`)
        }

        
    } catch (error) {
        
        res.status(500).send(`Error occurred while deletion: ${error}`);
        console.log(`Error occur while deleation`, error)
    }
})


export {router as bookRouter};