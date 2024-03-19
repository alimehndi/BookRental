import { Books, BooksRented } from "../mongodb/models/book.mjs";
// Function to calculate number of days between two dates
function calculateDaysBetweenDates(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((start.getTime() - end.getTime()) / oneDay));
    return diffDays + 1; // Add 1 to include both start and end dates
}
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
                    totalCharge += days * 1.5; // Regular books charge Rs. 1.5 per day
                    break;
                case 'Fiction':
                    totalCharge += days * 3; // Fiction books charge Rs. 3 per day
                    break;
                case 'Novel':
                    totalCharge += days * 1.5; // Novels charge Rs. 1.5 per day
                    break;
                default:
                    totalCharge += days; // Default charge Rs. 1 per day
                    break;
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
                    if (days <= 2) {
                        totalCharge += 2; // Minimum charge Rs. 2 for first 2 days
                    }
                    else {
                        totalCharge += 2 + (days - 2) * 1.5; // Rs 1 for first 2 days, Rs 1.5 thereafter
                    }
                    break;
                case 'Fiction':
                    totalCharge += days * 3; // Fiction books charge Rs. 3 per day
                    break;
                case 'Novel':
                    if (days < 3) {
                        totalCharge += 4.5; // Minimum charge Rs. 4.5 for novels rented less than 3 days
                    }
                    else {
                        totalCharge += 4.5 + (days - 3) * 1.5; // Rs 1.5 per day after the first 3 days
                    }
                    break;
                default:
                    totalCharge += days; // Default charge Rs. 1 per day
                    break;
            }
        }
    }
    return totalCharge;
};
export { calculateTotalRentalCharges1, calculateTotalRentalCharges2, calculateTotalRentalCharges3 };