
import Util from '../src/util.js';

describe('Util', () => {
    describe('Util.Math', () => {
        test('clamp', () => {
            expect(Util.Math.clamp(-1.0, 0.0, 1.0)).toBe(0.0);
            expect(Util.Math.clamp( 0.5, 0.0, 1.0)).toBe(0.5);
            expect(Util.Math.clamp(10.0, 0.0, 1.0)).toBe(1.0);
        });
    });
});

