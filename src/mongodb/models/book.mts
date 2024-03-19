import mongoose, { Schema, Document, Model } from "mongoose";

interface IBooks extends Document{

    _id: string,
    title: string,
    author: string,
    bookType: string,
}
 
const BooksSchema :Schema = new Schema ({
    _id: String,
    title: String,
    author: String,
    bookType: String, //enum

})


// Define interface for books rented
interface IBooksRented extends Document {
    bookId: string,
    customerId: string,
    dateOfRental: Date,
    isActive :boolean,
}

// Define interface for customer
interface ICustomer extends Document {
    _id: string,
    name:string,
    phoneNumber: number,
    address: string,
}

const booksRentedSchema: Schema = new Schema({
    bookId: String,
    customerId: String,
    dateOfRental: Date,
    isActive :Boolean,
});

const CustomerSchema: Schema = new Schema({
    _id: String,
    name:String,
    phoneNumber: Number,
    address: String,
});

const BooksRented: Model<IBooksRented> = mongoose.model<IBooksRented>('BooksRented', booksRentedSchema);
const Customer: Model<ICustomer> = mongoose.model<ICustomer>('Customer', CustomerSchema);
const Books: Model<IBooks> = mongoose.model<IBooks>('Books',BooksSchema);

export {IBooksRented,BooksRented,Customer,Books};
