/**
 * @since 20180911 17:16
 * @author vivaxy
 */
import { encode, decode } from '../index';

test('encode', function() {
  expect(encode(0)).toBe('A');
  expect(encode(1)).toBe('C');
  expect(encode(-1)).toBe('D');
  expect(encode(23)).toBe('uB');
  expect(encode(-123)).toBe('3H');
  expect(encode([0])).toBe('A');
});

test('decode', function() {
  expect(decode('A')).toStrictEqual([0]);
  expect(decode('B')).toStrictEqual([-0]);
  expect(decode('C')).toStrictEqual([1]);
  expect(decode('D')).toStrictEqual([-1]);
  expect(decode('3H')).toStrictEqual([-123]);
  expect(decode('ktC')).toStrictEqual([1234]);
  expect(decode('EAEE')).toStrictEqual([2, 0, 2, 2]);
  expect(() => decode('?')).toThrow('Invalid character (?)');
});
