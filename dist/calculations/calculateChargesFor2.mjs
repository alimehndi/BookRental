const calculateChargesForRegular2 = async (days) => {
    return days * 1.5;
};
const calculateChargesForFiction2 = async (days) => {
    return days * 3;
};
const calculateChargesForNovel2 = async (days) => {
    return days * 1.5;
};
export { calculateChargesForFiction2, calculateChargesForRegular2, calculateChargesForNovel2 };
