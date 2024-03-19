// Function to calculate total rental charges for a customer
const calculateTotalRentalCharges1 = (rentals) => {
    let totalCharge = 0;
    for (const rental of rentals) {
        console.log(rental.noOfDaysRented);
        totalCharge += rental.noOfDaysRented; // Per day rental charge is Rs 1
    }
    return totalCharge;
};
// Update the calculateTotalRentalCharges function
const calculateTotalRentalCharges2 = (rentals) => {
    let totalCharge = 0;
    for (const rental of rentals) {
        switch (rental.booktype) {
            case 'regular':
                totalCharge += rental.noOfDaysRented * 1.5; // Regular books charge Rs. 1.5 per day
                break;
            case 'fiction':
                totalCharge += rental.noOfDaysRented * 3; // Fiction books charge Rs. 3 per day
                break;
            case 'novel':
                totalCharge += rental.noOfDaysRented * 1.5; // Novels charge Rs. 1.5 per day
                break;
            default:
                totalCharge += rental.noOfDaysRented; // Default charge Rs. 1 per day
                break;
        }
    }
    return totalCharge;
};
// Update the calculateTotalRentalCharges function
const calculateTotalRentalCharges3 = (rentals) => {
    let totalCharge = 0;
    for (const rental of rentals) {
        switch (rental.booktype) {
            case 'regular':
                if (rental.noOfDaysRented <= 2) {
                    totalCharge += Math.max(2, rental.noOfDaysRented); // Minimum charge Rs. 2 for first 2 days
                }
                else {
                    totalCharge += 2 + (rental.noOfDaysRented - 2) * 1.5; // Rs 1 for first 2 days, Rs 1.5 thereafter
                }
                break;
            case 'fiction':
                totalCharge += rental.noOfDaysRented * 3; // Fiction books charge Rs. 3 per day
                break;
            case 'novel':
                if (rental.noOfDaysRented < 3) {
                    totalCharge += 4.5; // Minimum charge Rs. 4.5 for novels rented less than 3 days
                }
                else {
                    totalCharge += 4.5 + (rental.noOfDaysRented - 3) * 1.5; // Rs 1.5 per day after the first 3 days
                }
                break;
            default:
                totalCharge += rental.noOfDaysRented; // Default charge Rs. 1 per day
                break;
        }
    }
    return totalCharge;
};
export { calculateTotalRentalCharges1, calculateTotalRentalCharges2, calculateTotalRentalCharges3 };
