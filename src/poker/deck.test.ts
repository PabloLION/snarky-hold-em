import { fac52 } from 'utils/math';
import { rndBigInt } from 'utils/randomUtil';
import { decodeDeck, encodeDeck } from './deck';

const randomDeckOrder = [
  10, 40, 39, 6, 26, 21, 36, 42, 37, 15, 14, 51, 3, 24, 46, 28, 20, 49, 50, 38,
  0, 41, 48, 31, 23, 25, 2, 44, 47, 4, 45, 32, 9, 8, 27, 30, 1, 22, 5, 35, 11,
  34, 29, 13, 12, 19, 17, 43, 18, 16, 7, 33,
];
const randomDeckCode =
  56363924866149372356833692600853513468685044915805595929008984852327n;

describe.only('all deck test', () => {
  test('decode deck', () => {
    expect(decodeDeck(0n)).toStrictEqual(
      [...Array(52).fill(0).keys()].reverse()
    );
    expect(decodeDeck(randomDeckCode)).toStrictEqual(randomDeckOrder);
    expect(decodeDeck(fac52 - 1n)).toStrictEqual([...Array(52).fill(0).keys()]);
  });
  test('encode deck', () => {
    expect(encodeDeck([...Array(52).fill(0).keys()].reverse())).toBe(0n);
    expect(encodeDeck([...Array(52).fill(0).keys()])).toBe(fac52 - 1n);
    expect(encodeDeck(randomDeckOrder)).toStrictEqual(randomDeckCode);
  });

  test('encode and decode correctness', () => {
    for (let i = 0; i < 100; i++) {
      const code = rndBigInt(fac52);
      expect(encodeDeck(decodeDeck(code))).toBe(code);
    }
  });

  test('performance', () => {
    const start_time = Date.now();
    for (let i = 0; i < 1000; i++) {
      const code = rndBigInt(fac52);
      encodeDeck(decodeDeck(code)); //1500/1000
    }
    const end_time = Date.now();
    console.log('time lapsed : ', end_time - start_time);
  });
});
