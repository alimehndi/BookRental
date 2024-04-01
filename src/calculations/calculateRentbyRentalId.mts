import { Books,BooksRented } from "../mongodb/models/book.mjs";
import { calculateDaysBetweenDates } from "./calculateDaysBetweenDates.mjs";
import { calculateChargesForFiction3,calculateChargesForNovel3,calculateChargesForRegular3 } from "./calculateChargesFor3.mjs";
import { calculateChargesForFiction2,calculateChargesForNovel2,calculateChargesForRegular2 } from "./calculateChargesFor2.mjs";


// Function to calculate total rental charges for a customer
const calculateTotalRentalCharges1FromRentalId = async (rentalId: string): Promise<number> => {
    let totalCharge: number = 0;    
    const bookRented   = await  BooksRented.findById(rentalId)
        if(bookRented?.isActive)
        {      
            const days =  calculateDaysBetweenDates(bookRented.dateOfRental, new Date());
            totalCharge += days;
        }
    return totalCharge;
};

// Update the calculateTotalRentalCharges function
const calculateTotalRentalCharges2FromRentalId = async (rentalId: string): Promise<number> => {
    let totalCharge: number = 0;
    const bookRented  =  await BooksRented.findById(rentalId) 
        if(bookRented?.isActive)
        {
            const bookdata =  await Books.findById(bookRented.bookId);   
            const days = calculateDaysBetweenDates(bookRented.dateOfRental, new Date());
            switch (bookdata?.bookType) {
                case 'Regular':
                    totalCharge += await calculateChargesForRegular2(days);
                    break;
                case 'Fiction':
                    totalCharge += await calculateChargesForFiction2(days);
                    break;
                case 'Novel':
                    totalCharge += await calculateChargesForNovel2(days);
                    break;
                // default:
                //     totalCharge += days; // Default charge Rs. 1 per day
                //     break;
            }
        }
    return totalCharge;
};
// Update the calculateTotalRentalCharges function
const calculateTotalRentalCharges3FromRentalId = async (rentalId : string): Promise<number> => {
    let totalCharge: number = 0;
    const bookRented  = await BooksRented.findById(rentalId)  
        if(bookRented?.isActive)
        {
            const bookdata = await Books.findById(bookRented.bookId);
            const days = calculateDaysBetweenDates(bookRented.dateOfRental, new Date());
            switch (bookdata?.bookType) {
                case 'Regular':
                    totalCharge += await calculateChargesForRegular3(days);
                    break;
                case 'Fiction':
                    totalCharge += await calculateChargesForFiction3(days);
                    break;
                case 'Novel':
                    totalCharge += await calculateChargesForNovel3(days);
                    break;
                // default:
                //     totalCharge += days; // Default charge Rs. 1 per day
                //     break;
            }
    }
    return totalCharge;
};
export {calculateTotalRentalCharges1FromRentalId,calculateTotalRentalCharges2FromRentalId,calculateTotalRentalCharges3FromRentalId};


//


