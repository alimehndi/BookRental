import mongoose, { Schema } from "mongoose";
const BooksSchema = new Schema({
    _id: String,
    title: String,
    author: String,
    bookType: String,
});
const booksRentedSchema = new Schema({
    bookId: String,
    customerId: String,
    dateOfRental: Date,
    isActive: Boolean,
});
const CustomerSchema = new Schema({
    _id: String,
    name: String,
    phoneNumber: Number,
    address: String,
});
const BooksRented = mongoose.model('BooksRented', booksRentedSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const Books = mongoose.model('Books', BooksSchema);
export { BooksRented, Customer, Books };
