import { Books, Customer, BooksRented } from "../mongodb/models/book.mjs";
import { app } from "../app.mjs";
import supertest from 'supertest';
const port = 3002;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
describe('BooksRental Router', () => {
    describe('Checking the GET request', () => {
        describe('Get rental by id', () => {
            it('GET /api/rental/:rentalId', async () => {
                const rentalId = '65f2beb422e3158b9752b307';
                await supertest(app)
                    .get(`/api/rental/${rentalId}`)
                    .expect(200);
            });
            // it('GET /api/rental/:rentalId', async () => {
            //     const rentalId = 'b1011';
            //     await supertest(app)
            //         .get(`/api/rental/${bookId}`)
            //         .expect(404);
            // });
        });
    });
    describe('Checking the POST api', () => {
        describe('POST /', () => {
            it('should add a new Rental', async () => {
                const newBookData = {
                    "_id": "TestingBookId",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Regular'
                };
                const newCustomerData = {
                    "_id": "TestingCustomerId",
                    "name": "Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                await Books.create(newBookData);
                await Customer.create(newCustomerData);
                const newRentalData = {
                    "bookId": "TestingBookId",
                    "customerId": "TestingCustomerId",
                };
                const response = await supertest(app)
                    .post('/api/rental')
                    .send(newRentalData);
                expect(response.status).toBe(200);
                expect(response.body.bookId).toBe(newBookData._id);
                expect(response.body.customerId).toBe(newCustomerData._id);
                expect(response.body.isActive).toBe(true);
                await BooksRented.deleteOne({ bookId: "TestingBookId" });
                await Books.deleteOne({ _id: "TestingBookId" });
                await Customer.deleteOne({ _id: "TestingCustomerId" });
            });
            // it('should handle errors during rental creation ', async () => {
            //     const response = await supertest(app)
            //         .post('/api/rental')
            //         .send({});
            //     expect(response.status).toBe(500);
            //     expect(response.text).toContain('Error creating a Book');
            // });
        });
    });
    describe('Checking the PUT api', () => {
        describe('PUT /api/rental/:id', () => {
            it('should update a book', async () => {
                const newBookData = {
                    "_id": "TestingBookId",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Regular'
                };
                const newCustomerData = {
                    "_id": "TestingCustomerId",
                    "name": "Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                await Books.create(newBookData);
                await Customer.create(newCustomerData);
                const newRentalData = {
                    "bookId": "TestingBookId",
                    "customerId": "TestingCustomerId",
                };
                const updatedRentalData = {
                    "bookId": "TestingBookId",
                    "customerId": "TestingCustomerId",
                    "isActive": false,
                };
                const RentalData = await BooksRented.create(newRentalData);
                // Make PUT request to update the book
                const response = await supertest(app)
                    .put(`/api/rental/${RentalData._id}`)
                    .send(updatedRentalData);
                // Check response status
                expect(response.status).toBe(200);
                // Check if the book is updated correctly
                const updatedBook = await BooksRented.findById(RentalData._id);
                expect(updatedBook?.bookId).toBe(updatedRentalData.bookId);
                expect(updatedBook?.customerId).toBe(updatedRentalData.customerId);
                expect(updatedBook?.isActive).toBe(false);
                await Books.deleteOne({ _id: "TestingBookId" });
                await Customer.deleteOne({ _id: "TestingCustomerId" });
                await BooksRented.deleteOne({ bookId: "TestingBookId" });
            });
            // it('should handle errors during book update', async () => {
            //     // Make PUT request with invalid book id
            //     const response = await supertest(app)
            //         .put(`/api/rental/invalid_id`)
            //         .send({});
            //     // Check response status
            //     expect(response.status).toBe(404);
            //     expect(response.body.error).toBe('Book not found');
            // });
        });
    });
    describe('Checking the DELETE api', () => {
        describe('DELETE /api/rental/:rentalId', () => {
            it('should delete a book', async () => {
                const newBookData = {
                    "_id": "TestingBookId",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "bookType": 'Regular'
                };
                const newCustomerData = {
                    "_id": "TestingCustomerId",
                    "name": "Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                await Books.create(newBookData);
                await Customer.create(newCustomerData);
                const newRentalData = {
                    "bookId": "TestingBookId",
                    "customerId": "TestingCustomerId",
                };
                const RentalData = await BooksRented.create(newRentalData);
                // Make DELETE request to delete the book
                const response = await supertest(app)
                    .delete(`/api/rental/${RentalData._id}`);
                // Check response status
                expect(response.status).toBe(200);
                // Check if the book is deleted from the database
                const deletedBook = await BooksRented.findById(RentalData._id);
                expect(deletedBook).toBeNull();
                await Books.deleteOne({ _id: "TestingBookId" });
                await Customer.deleteOne({ _id: "TestingCustomerId" });
            });
            // it('should handle errors during book deletion', async () => {
            //     // Make DELETE request with invalid book id
            //     const response = await supertest(app)
            //         .delete(`/api/rental/invalid_id`);
            //     // Check response status
            //     expect(response.status).toBe(404);
            //     expect(response.body.error).toBe('Book not found');
            // });
        });
    });
});
