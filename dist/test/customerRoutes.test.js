import { Customer } from "../mongodb/models/book.mjs";
import { app } from "../app.mjs";
import supertest from 'supertest';
const port = 3001;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
describe('Customer Router', () => {
    describe('Checking the GET request', () => {
        describe('Get customer by id', () => {
            it('GET /api/Customer/:customerId', async () => {
                const customerId = 'C1';
                await supertest(app)
                    .get(`/api/customer/${customerId}`)
                    .expect(200);
            });
            // it('GET /api/Customer/:customerId', async () => {
            //     const customerId = 'b1011';
            //     await supertest(app)
            //         .get(`/api/Customer/${customerId}`)
            //         .expect(404);
            // });
        });
    });
    describe('Checking the POST api', () => {
        describe('POST /', () => {
            it('should add a new customer', async () => {
                const newCustomerData = {
                    "_id": "TestingId",
                    "name": "Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                const response = await supertest(app)
                    .post('/api/Customer')
                    .send(newCustomerData);
                expect(response.status).toBe(200);
                expect(response.body.name).toBe(newCustomerData.name);
                expect(response.body.address).toBe(newCustomerData.address);
                expect(response.body._id).toBe(newCustomerData._id);
                expect(response.body.phoneNumber).toBe(newCustomerData.phoneNumber);
                await Customer.deleteOne({ _id: "TestingId" });
            });
            // it('should handle errors during customer/ creation', async () => {
            //     const response = await supertest(app)
            //         .post('/api/Customer')
            //         .send({});
            //     expect(response.status).toBe(500);
            //     expect(response.text).toContain('Error creating a customer/');
            // });
        });
    });
    describe('Checking the PUT api', () => {
        describe('PUT /api/Customer/:id', () => {
            it('should update a customer/', async () => {
                // Create a customer/ to update
                const newCustomerData = {
                    "_id": "TestingId",
                    "name": "Testing Name",
                    "phoneNumber": 123456789,
                    "address": "Testing Address",
                };
                const newCustomer = await Customer.create(newCustomerData);
                // Updated customer/ data
                const updatedCustomerData = {
                    "_id": "TestingId",
                    "name": "Testing Name",
                    "phoneNumber": 123456789,
                    "address": "New Testing Address",
                };
                // Make PUT request to update the customer/
                const response = await supertest(app)
                    .put(`/api/customer/${newCustomer._id}`)
                    .send(updatedCustomerData);
                // Check response status
                expect(response.status).toBe(200);
                // Check if the customer/ is updated correctly
                const updatedCustomer = await Customer.findById(newCustomer._id);
                expect(updatedCustomer?.name).toBe(updatedCustomerData.name);
                expect(updatedCustomer?.address).toBe(updatedCustomerData.address);
                expect(updatedCustomer?.phoneNumber).toBe(updatedCustomerData.phoneNumber);
                await Customer.deleteOne({ _id: "TestingId" });
            });
            // it('should handle errors during customer/ update', async () => {
            //     // Make PUT request with invalid customer/ id
            //     const response = await supertest(app)
            //         .put(`/api/Customer/invalid_id`)
            //         .send({});
            //     // Check response status
            //     expect(response.status).toBe(404);
            //     expect(response.body.error).toBe('customer/ not found');
            // });
        });
    });
    describe('Checking the DELETE api', () => {
        describe('DELETE /api/Customer/:id', () => {
            it('should delete a customer/', async () => {
                // Create a customer/ to delete
                const newCustomerData = {
                    "_id": "TestingId2",
                    "title": "Testingtitle",
                    "author": "Testing Author",
                    "customer/Type": 'Regular'
                };
                const newCustomer = await Customer.create(newCustomerData);
                // Make DELETE request to delete the customer/
                const response = await supertest(app)
                    .delete(`/api/Customer/${newCustomer._id}`);
                // Check response status
                expect(response.status).toBe(200);
                // Check if the customer/ is deleted from the database
                const deletedCustomer = await Customer.findById(newCustomer._id);
                expect(deletedCustomer).toBeNull();
            });
            // it('should handle errors during customer/ deletion', async () => {
            //     // Make DELETE request with invalid customer/ id
            //     const response = await supertest(app)
            //         .delete(`/api/customer/invalid_id`);
            //     // Check response status
            //     expect(response.status).toBe(404);
            //     expect(response.body.error).toBe('customer/ not found');
            // });
        });
    });
});
