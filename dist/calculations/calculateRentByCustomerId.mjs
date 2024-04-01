import { Books, BooksRented } from "../mongodb/models/book.mjs";
import { calculateDaysBetweenDates } from "./calculateDaysBetweenDates.mjs";
import { calculateChargesForFiction3, calculateChargesForNovel3, calculateChargesForRegular3 } from "./calculateChargesFor3.mjs";
import { calculateChargesForFiction2, calculateChargesForNovel2, calculateChargesForRegular2 } from "./calculateChargesFor2.mjs";
// Function to calculate total rental charges for a customer
const calculateTotalRentalCharges1 = async (customerId) => {
    let totalCharge = 0;
    const booksrented = await BooksRented.find({ customerId: customerId });
    for (const book of booksrented) {
        if (book.isActive) {
            const days = calculateDaysBetweenDates(book.dateOfRental, new Date());
            totalCharge += days;
        }
    }
    return totalCharge;
};
// Update the calculateTotalRentalCharges function
const calculateTotalRentalCharges2 = async (customerId) => {
    let totalCharge = 0;
    const booksrented = await BooksRented.find({ customerId: customerId });
    for (const book of booksrented) {
        if (book.isActive) {
            const bookdata = await Books.findById(book.bookId);
            const days = calculateDaysBetweenDates(book.dateOfRental, new Date());
            switch (bookdata?.bookType) {
                case 'Regular':
                    totalCharge += await calculateChargesForRegular2(days); // Regular books charge Rs. 1.5 per day
                    break;
                case 'Fiction':
                    totalCharge += await calculateChargesForFiction2(days); // Fiction books charge Rs. 3 per day
                    break;
                case 'Novel':
                    totalCharge += await calculateChargesForNovel2(days); // Novels charge Rs. 1.5 per day
                    break;
                // default:
                //     totalCharge += days; // Default charge Rs. 1 per day
                //     break;
            }
        }
    }
    return totalCharge;
};
// Update the calculateTotalRentalCharges function
const calculateTotalRentalCharges3 = async (customerId) => {
    let totalCharge = 0;
    const booksrented = await BooksRented.find({ customerId: customerId });
    for (const book of booksrented) {
        if (book.isActive) {
            const bookdata = await Books.findById(book.bookId);
            const days = calculateDaysBetweenDates(book.dateOfRental, new Date());
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
    }
    return totalCharge;
};
export { calculateTotalRentalCharges1, calculateTotalRentalCharges2, calculateTotalRentalCharges3 };
