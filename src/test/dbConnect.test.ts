import mongoose from "mongoose";
import { app } from "../app.mjs";

const port = 3006
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

describe('testing the connection to database', () => {
      describe('MongoDB connection', ()=> {
        it('Connect to mongodb' , async () => {

            const connection = await mongoose.connect(process.env.DB_URI as string);
            ;
            console.log(connection)
            expect(connection).toBeTruthy();
        });
      });
});