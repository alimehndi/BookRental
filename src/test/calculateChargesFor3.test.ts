import {
    calculateChargesForRegular3,
    calculateChargesForFiction3,
    calculateChargesForNovel3,
  } from '../calculations/calculateChargesFor3.mjs';
  
  describe('Charge Calculation Functions', () => {
    // Test for calculateChargesForRegular3
    describe('calculateChargesForRegular3', () => {
      it('should calculate charges for regular books correctly', async () => {
        expect(await calculateChargesForRegular3(1)).toBe(2); // Minimum charge for 1 day
        expect(await calculateChargesForRegular3(2)).toBe(2); // Minimum charge for 2 days
        expect(await calculateChargesForRegular3(3)).toBe(3.5); // 2 + 1.5 for 3 days
        expect(await calculateChargesForRegular3(4)).toBe(5); // 2 + 1.5*2 for 4 days
        // Add more test cases as needed
      });
    });
  
    // Test for calculateChargesForFiction3
    describe('calculateChargesForFiction3', () => {
      it('should calculate charges for fiction books correctly', async () => {
        expect(await calculateChargesForFiction3(1)).toBe(3); // 3 per day
        expect(await calculateChargesForFiction3(3)).toBe(9); // 3 * 3 for 3 days
        });
    });
  
    // Test for calculateChargesForNovel3
    describe('calculateChargesForNovel3', () => {
      it('should calculate charges for novels correctly', async () => {
        expect(await calculateChargesForNovel3(1)).toBe(4.5); // Minimum charge for less than 3 days
        expect(await calculateChargesForNovel3(3)).toBe(4.5); // Minimum charge for 3 days
        expect(await calculateChargesForNovel3(4)).toBe(6); // 4.5 + 1.5 for 4 days
      });
    });
  });
  