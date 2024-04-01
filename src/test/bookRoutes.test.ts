import { Books } from "../mongodb/models/book.mjs";
import { app } from "../app.mjs";
import  supertest  from 'supertest';
import { BooksRented } from "../mongodb/models/book.mjs";
const port = 3000
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
describe('Book Router', () => {
describe('Checking the GET request', () => {
    describe('Get book by id', () => {
        it('GET /api/books/:bookId', async () => {
            const bookId = 'b1';
            await supertest(app)
                .get(`/api/books/${bookId}`)
                .expect(200);
        });
        // it('GET /api/books/:bookId', async () => {
        //     const bookId = 'b1011';
        //     await supertest(app)
        //         .get(`/api/books/${bookId}`)
        //         .expect(404);
        // });
    });
});
describe('Checking the POST api', () => {
    describe('POST /', () => {
        it('should add a new book', async () => {
            const newBookData = {
                "_id": "TestingId",
                "title": "Testingtitle",
                "author": "Testing Author",
                "bookType": 'Regular'
            };
            const response = await supertest(app)
                .post('/api/books')
                .send(newBookData);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(newBookData.title);
            expect(response.body.author).toBe(newBookData.author);
            expect(response.body._id).toBe(newBookData._id);
            expect(response.body.bookType).toBe(newBookData.bookType);
            await Books.deleteOne({_id : "TestingId"});
        });
        // it('should handle errors during book creation', async () => {
        //     const response = await supertest(app)
        //         .post('/api/books')
        //         .send({});

        //     expect(response.status).toBe(500);
        //     expect(response.text).toContain('Error creating a Book');
        // });
    });
});

 describe('Checking the PUT api', () => {
    describe('PUT /api/books/:id', () => {
        it('should update a book', async () => {
            // Create a book to update
            const newBookData = {
            "_id": "TestingId1",
            "title": "Testingtitle",
            "author": "Testing Author",
            "bookType": 'Regular'
            };
            const newBook = await Books.create(newBookData);

            // Updated book data
            const updatedBookData = {
                "_id": "TestingId1",
                "title": "Testingtitlenew",
                "author": "Testing Author",
                "bookType": 'Regular'         
              } ;
            // Make PUT request to update the book
            const response = await supertest(app)
                .put(`/api/books/${newBook._id}`)
                .send(updatedBookData);

            // Check response status
            expect(response.status).toBe(200);

            // Check if the book is updated correctly
            const updatedBook = await Books.findById(newBook._id);
            expect(updatedBook?.title).toBe(updatedBookData.title);
            expect(updatedBook?.author).toBe(updatedBookData.author);
            expect(updatedBook?.bookType).toBe(updatedBookData.bookType);
            await Books.deleteOne({_id : "TestingId1"});
        });

        // it('should handle errors during book update', async () => {
        //     // Make PUT request with invalid book id
        //     const response = await supertest(app)
        //         .put(`/api/books/invalid_id`)
        //         .send({});

        //     // Check response status
        //     expect(response.status).toBe(404);
        //     expect(response.body.error).toBe('Book not found');
        // });
    });
});

describe('Checking the DELETE api', () => {
    describe('DELETE /api/books/:id', () => {
        it('should delete a book', async () => {
            // Create a book to delete
            const newBookData = {
                "_id": "TestingId2",
                "title": "Testingtitle",
                "author": "Testing Author",
                "bookType": 'Regular'
            };
            const newBook = await Books.create(newBookData);

            // Make DELETE request to delete the book
            const response = await supertest(app)
                .delete(`/api/books/${newBook._id}`);

            // Check response status
            expect(response.status).toBe(200);

            // Check if the book is deleted from the database
            const deletedBook = await Books.findById(newBook._id);
            expect(deletedBook).toBeNull();
        });

        // it('should handle errors during book deletion', async () => {
        //     // Make DELETE request with invalid book id
        //     const response = await supertest(app)
        //         .delete(`/api/books/invalid_id`);

        //     // Check response status
        //     expect(response.status).toBe(404);
        //     expect(response.body.error).toBe('Book not found');
        // });
    });
});
});