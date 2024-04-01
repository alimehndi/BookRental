import { Books,Customer,BooksRented } from "../mongodb/models/book.mjs";
import { app } from "../app.mjs";
import  supertest  from 'supertest';
const port = 3003
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
describe('calculate Rent By rentalId', () => {
    describe('Calculating for same date Regular, Fiction and Novel  Books', () => {
            it('GET /rental/:rentalId ', async () => {
                const newBookData = {
                    "_id": "TestingBookId1",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Regular'
                };
                const newCustomerData = {
                    "_id": "TestingCustomerId1",
                    "name":"Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                await Books.create(newBookData);
                await Customer.create(newCustomerData);
                const newRentalData = {
                    "bookId": "TestingBookId1",
                    "customerId": "TestingCustomerId1",
                    "dateOfRental":"2024-02-16",
                    "isActive" :true,
                };
                const rentalData =await BooksRented.create(newRentalData);
                const response  = await supertest(app)
                    .get(`/rental/${rentalData._id}`)
                    .expect(200)
                    .send(rentalData);
                
                
                    expect(response.body).toMatchObject({
                      "totalCharges1": 46 ,"totalCharges2": 69 , "totalCharges3": 68 });
                     await BooksRented.deleteMany({ bookId : "TestingBookId1"});
                     await Books.deleteMany({_id :"TestingBookId1"});
                     await Customer.deleteMany({_id :"TestingCustomerId1"});
                                   
            });
            it('GET /rental/:rentalId', async () => {
                const newBookData = {
                    "_id": "TestingBookId1",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Fiction'
                };
                const newCustomerData = {
                    "_id": "TestingCustomerId1",
                    "name":"Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                await Books.create(newBookData);
                await Customer.create(newCustomerData);
                const newRentalData = {
                    "bookId": "TestingBookId1",
                    "customerId": "TestingCustomerId1",
                    "dateOfRental":"2024-02-16",
                    "isActive" :true,
                };
                const rentalData =await BooksRented.create(newRentalData);
                const response  = await supertest(app)
                    .get(`/rental/${rentalData._id}`)
                    .expect(200)
                    .send(rentalData);
                
                
                    expect(response.body).toMatchObject({
                      "totalCharges1": 46 ,"totalCharges2": 138 , "totalCharges3": 138 });
                     await BooksRented.deleteMany({ bookId : "TestingBookId1"});
                     await Books.deleteMany({_id :"TestingBookId1"});
                     await Customer.deleteMany({_id :"TestingCustomerId1"});
                                   
            });
            it('GET /rental/:rentalId', async () => {
                const newBookData = {
                    "_id": "TestingBookId1",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Novel'
                };
                const newCustomerData = {
                    "_id": "TestingCustomerId1",
                    "name":"Testing Name",
                     "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                await Books.create(newBookData);
                await Customer.create(newCustomerData);
                const newRentalData = {
                    "bookId": "TestingBookId1",
                    "customerId": "TestingCustomerId1",
                    "dateOfRental":"2024-02-16",
                    "isActive" :true,
                };
                const rentalData =await BooksRented.create(newRentalData);
                const response  = await supertest(app)
                    .get(`/rental/${rentalData._id}`)
                    .expect(200)
                    .send(rentalData);
                
                
                    expect(response.body).toMatchObject({
                      "totalCharges1": 46 ,"totalCharges2": 69 , "totalCharges3": 69 });
                     await BooksRented.deleteMany({ bookId : "TestingBookId1"});
                     await Books.deleteMany({_id :"TestingBookId1"});
                     await Customer.deleteMany({_id :"TestingCustomerId1"});
                                   
            });
        }); 
});
    

    