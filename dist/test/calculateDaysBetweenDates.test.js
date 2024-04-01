import { calculateDaysBetweenDates } from '../calculations/calculateDaysBetweenDates.mjs';
describe('calculateDaysBetweenDates', () => {
    it('should calculate the number of days between two dates correctly', () => {
        const startDate = new Date('2024-03-01');
        const endDate = new Date('2024-03-10');
        expect(calculateDaysBetweenDates(startDate, endDate)).toBe(10); // 10 days between March 1 and March 10
    });
    it('should handle the same start and end date correctly', () => {
        const startDate = new Date('2024-03-01');
        const endDate = new Date('2024-03-01');
        expect(calculateDaysBetweenDates(startDate, endDate)).toBe(1); // Same start and end date, so 1 day
    });
    it('should handle different start and end times within the same day correctly', () => {
        const startDate = new Date('2024-03-01T08:00:00');
        const endDate = new Date('2024-03-01T18:00:00');
        expect(calculateDaysBetweenDates(startDate, endDate)).toBe(1); // Start and end time within the same day, so 1 day
    });
    it('should handle different start and end times spanning multiple days correctly', () => {
        const startDate = new Date('2024-03-01T08:00:00');
        const endDate = new Date('2024-03-03T18:00:00');
        expect(calculateDaysBetweenDates(startDate, endDate)).toBe(3); // 3 days from March 1 to March 3
    });
    it('should handle the case of start date should be earlier than end date ', () => {
        const startDate = new Date('2024-03-10');
        const endDate = new Date('2024-03-9');
        expect(() => calculateDaysBetweenDates(startDate, endDate)).toThrow(Error);
    });
});
