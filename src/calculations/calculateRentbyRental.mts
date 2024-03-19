import { Books,BooksRented } from "../mongodb/models/book.mjs";
import { calculateDaysBetweenDates } from "./calculateDaysBetweenDates.mjs";


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
                    if (days <= 2) {
                        totalCharge += 2; // Minimum charge Rs. 2 for first 2 days
                    } else {
                        totalCharge += 2 + (days - 2) * 1.5; // Rs 1 for first 2 days, Rs 1.5 thereafter
                    }
                    break;
                case 'Fiction':
                    totalCharge += days * 3; // Fiction books charge Rs. 3 per day
                    break;
                case 'Novel':
                    if (days < 3) {
                        totalCharge += 4.5; // Minimum charge Rs. 4.5 for novels rented less than 3 days
                    } else {
                        totalCharge += 4.5 + (days - 3) * 1.5; // Rs 1.5 per day after the first 3 days
                    }
                    break;
                default:
                    totalCharge += days; // Default charge Rs. 1 per day
                    break;
            }
            
            
            
        

    }
    return totalCharge;
    
    
    
    
    
    
    };
export {calculateTotalRentalCharges1FromRentalId,calculateTotalRentalCharges2FromRentalId,calculateTotalRentalCharges3FromRentalId};


//


