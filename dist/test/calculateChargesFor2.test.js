import { calculateChargesForRegular2, calculateChargesForFiction2, calculateChargesForNovel2, } from '../calculations/calculateChargesFor2.mjs';
describe('Charge Calculation Functions', () => {
    // Test for calculateChargesForRegular2
    describe('calculateChargesForRegular2', () => {
        it('should calculate charges for regular books correctly', async () => {
            expect(await calculateChargesForRegular2(1)).toBe(1.5); // 1.5 per day
            expect(await calculateChargesForRegular2(2)).toBe(3); // 1.5 * 2 for 2 days
            expect(await calculateChargesForRegular2(3)).toBe(4.5); // 1.5 * 3 for 3 days      
        });
    });
    // Test for calculateChargesForFiction2
    describe('calculateChargesForFiction2', () => {
        it('should calculate charges for fiction books correctly', async () => {
            expect(await calculateChargesForFiction2(1)).toBe(3); // 3 per day
            expect(await calculateChargesForFiction2(2)).toBe(6); // 3 * 2 for 2 days
            expect(await calculateChargesForFiction2(3)).toBe(9); // 3 * 3 for 3 days
        });
    });
    // Test for calculateChargesForNovel2
    describe('calculateChargesForNovel2', () => {
        it('should calculate charges for novels correctly', async () => {
            expect(await calculateChargesForNovel2(1)).toBe(1.5); // 1.5 per day
            expect(await calculateChargesForNovel2(2)).toBe(3); // 1.5 * 2 for 2 days
            expect(await calculateChargesForNovel2(3)).toBe(4.5); // 1.5 * 3 for 3 days
        });
    });
});
