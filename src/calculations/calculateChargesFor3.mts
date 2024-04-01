const calculateChargesForRegular3 = async (days : number) : Promise<number> => {
    let chargeRegular:number =0;
    if (days <= 2) {
        chargeRegular += 2; // Minimum charge Rs. 2 for first 2 days
    } else {
        chargeRegular += 2 + (days - 2) * 1.5; // Rs 1 for first 2 days, Rs 1.5 thereafter
    }
    return chargeRegular;
   }
const calculateChargesForFiction3 = async (days : number) : Promise<number> => {

 return days*3;
}
const calculateChargesForNovel3 = async (days : number) : Promise<number> => {
    let chargeNovel :number =0;
    if (days < 3) {
        chargeNovel += 4.5; // Minimum charge Rs. 4.5 for novels rented less than 3 days
    } else {
        chargeNovel += 4.5 + (days - 3) * 1.5; // Rs 1.5 per day after the first 3 days
    }
    
    return chargeNovel;
   }

  export {calculateChargesForFiction3,calculateChargesForRegular3,calculateChargesForNovel3}; 
