
import Util from '../src/util.js';

describe('Util', () => {
    describe('Util.Math', () => {
        test('clamp', () => {
            expect(Util.Math.clamp(-1.0, 0.0, 1.0)).toBe(0.0);
            expect(Util.Math.clamp( 0.5, 0.0, 1.0)).toBe(0.5);
            expect(Util.Math.clamp(10.0, 0.0, 1.0)).toBe(1.0);
        });
        test('saturate', () => {
            expect(Util.Math.saturate(-1.0, 0.0, 1.0)).toBe(0.0);
            expect(Util.Math.saturate( 0.5, 0.0, 1.0)).toBe(0.5);
            expect(Util.Math.saturate(10.0, 0.0, 1.0)).toBe(1.0);
        });
        test('easing', () => {
            expect(Util.Math.easing(0.0)).toBe(0.0);
            expect(Util.Math.easing(1.0)).toBe(1.0);
        });
        test('easeOutCubic', () => {
            expect(Util.Math.easeOutCubic(0.0)).toBe(0.0);
            expect(Util.Math.easeOutCubic(1.0)).toBe(1.0);
        });
        test('easeQuintic', () => {
            expect(Util.Math.easeQuintic(0.0)).toBe(0.0);
            expect(Util.Math.easeQuintic(1.0)).toBe(1.0);
        });
    });

    describe('Util.Str', () => {
        test('zeroPadding', () => {
            expect(Util.Str.zeroPadding(1, 3)).toBe('001');
            expect(Util.Str.zeroPadding(100, 3)).toBe('100');
            expect(Util.Str.zeroPadding(10000, 3)).toBe('10000');
            expect(Util.Str.zeroPadding(-1, 3)).toBe('-001');
            expect(Util.Str.zeroPadding(-100, 3)).toBe('-100');
            expect(Util.Str.zeroPadding(-10000, 3)).toBe('-10000');
            expect(Util.Str.zeroPadding(0.1, 3)).toBe('000.1');
            expect(Util.Str.zeroPadding(null, 3)).toBeNull();
            expect(Util.Str.zeroPadding(1, null)).toBeNull();
        });
        test('convertTimeToSerial', () => {
            let string = '1234/05/06 07:08:09';
            let date = new Date(string);
            expect(Util.Str.convertTimeToSerial(date)).toBe(string);
        });
        test('numberToHexString', () => {
            let color = [255, 0, 255];
            expect(Util.Str.numberToHexString(color)).toBe('#ff00ff');
        });
        test('hexStringToNumber', () => {
            let ret = Util.Str.hexStringToNumber('#ff00ff');
            expect(ret).toBeInstanceOf(Array);
            expect(ret).toHaveLength(3);
            expect(ret[0]).toBeCloseTo(1.0, 2);
            expect(ret[1]).toBeCloseTo(0.0, 2);
            expect(ret[2]).toBeCloseTo(1.0, 2);
            ret = Util.Str.hexStringToNumber(null);
            expect(ret).toBeNull();
            ret = Util.Str.hexStringToNumber('ZZZZZZ');
            expect(ret).toBeNull();
            ret = Util.Str.hexStringToNumber('#ffff');
            expect(ret).toBeNull();
            ret = Util.Str.hexStringToNumber('ffffffffff');
            expect(ret).toBeNull();
        });
    });

    test('Util.isNumber', () => {
        expect(Util.isNumber(0)).toBe(true);
        expect(Util.isNumber(0.0)).toBe(true);
        expect(Util.isNumber(0xf)).toBe(true);
        expect(Util.isNumber(null)).toBe(false);
        expect(Util.isNumber('0')).toBe(false);
        expect(Util.isNumber([])).toBe(false);
        expect(Util.isNumber({})).toBe(false);
    });

    test('Util.isString', () => {
        expect(Util.isString(0)).toBe(false);
        expect(Util.isString(0.0)).toBe(false);
        expect(Util.isString(0xf)).toBe(false);
        expect(Util.isString(null)).toBe(false);
        expect(Util.isString('0')).toBe(true);
        expect(Util.isString([])).toBe(false);
        expect(Util.isString({})).toBe(false);
    });

    test('Util.isObject', () => {
        expect(Util.isObject(0)).toBe(false);
        expect(Util.isObject(0.0)).toBe(false);
        expect(Util.isObject(0xf)).toBe(false);
        expect(Util.isObject(null)).toBe(false);
        expect(Util.isObject('0')).toBe(false);
        expect(Util.isObject([])).toBe(false);
        expect(Util.isObject({})).toBe(true);
    });
});

