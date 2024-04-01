import { Books,Customer,BooksRented } from "../mongodb/models/book.mjs";
import { app } from "../app.mjs";
import  supertest  from 'supertest';
const port = 3004
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
describe('calculate Rent By rentalId', () => {
    describe('Calculating for same date Regular, Fiction and Novel  Books', () => {
            it('GET /customer/:customerId ', async () => {
                const newBookData1 = {
                    "_id": "TestingBookId01",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Regular'
                };
                const newBookData2 = {
                    "_id": "TestingBookId02",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Regular'
                };
                const newCustomerData1 = {
                    "_id": "TestingCustomerId01",
                    "name":"Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                await Books.create(newBookData1);
                await Books.create(newBookData2);
                const customer1 = await Customer.create(newCustomerData1);
                const newRentalData1 = {
                    "bookId": "TestingBookId01",
                    "customerId": "TestingCustomerId01",
                    "dateOfRental":"2024-02-16",
                    "isActive" :true,
                };
                const newRentalData2 = {
                    "bookId": "TestingBookId02",
                    "customerId": "TestingCustomerId01",
                    "dateOfRental":"2024-02-16",
                    "isActive" :true,
                };
                const rentalData1 = await BooksRented.create(newRentalData1);
                const rentalData2 = await BooksRented.create(newRentalData2);
                
                const response  = await supertest(app)
                    .get(`/customer/${customer1._id}`)
                    .expect(200)
                    .send(customer1);
                
                
                    expect(response.body).toMatchObject({
                      "totalCharges1": 92 ,"totalCharges2": 138 , "totalCharges3": 136 });
                     await BooksRented.deleteMany({ bookId : "TestingBookId1"});
                     await Books.deleteMany({_id :"TestingBookId01"});
                     await Books.deleteMany({_id :"TestingBookId02"});
                     await Customer.deleteMany({_id :"TestingCustomerId1"});
                                   
            });
        }); 
});
    

    