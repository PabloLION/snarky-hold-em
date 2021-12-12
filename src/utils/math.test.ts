import { fac52, intToPermOrder, permOrderToInt } from './math';
import { rndBigInt } from './randomUtil';

describe('all math test', () => {
  /* For NumType == bigint */
  const range52 = [...Array(52).keys()];
  const elementNumber = 52;
  const max_code = fac52 - 1n;
  test('0 should parse to the largest permutation [9...0]', () => {
    expect(intToPermOrder(0n, elementNumber)).toStrictEqual(
      range52.slice().reverse()
    );
  });
  test('factorial(10)-1 should parse to [0...9]', () => {
    expect(intToPermOrder(max_code, elementNumber)).toStrictEqual(range52);
  });

  test('inverse of intToPermOrder also works', () => {
    let code: bigint = rndBigInt(fac52);
    for (let i = 0; i < 100; i++) {
      expect(permOrderToInt(intToPermOrder(code, elementNumber))).toBe(code);
    }
  });

  test('performance', () => {
    const start_time = Date.now();
    for (let i = 0; i < 1000; i++) {
      let code = rndBigInt(fac52);
      // 52 elements: 1475/1000, 10elements : 608/10000
      permOrderToInt(intToPermOrder(code, elementNumber));
      // 52 elements: 196/1000, 10elements : 107/10000
      // intToPermOrder(code, elementNumber);
    }
    const end_time = Date.now();
    console.log('time lapsed : ', end_time - start_time); // DEV_LOG_TO_REMOVE
  });

  /* For NumType == number */
  // const range09 = [...Array(10).keys()];
  // const elementNumber = 10;
  // const max_code = 3628799; // = factorial(10)-1
  // test('0 should parse to the largest permutation [9...0]', () => {
  //   expect(intToPermOrder(0, elementNumber)).toStrictEqual(
  //     range09.slice().reverse()// better than range09.reverse(); // always reverse back next line if not intended
  //   );
  // });
  // test('factorial(10)-1 should parse to [0...9]', () => {
  //   expect(intToPermOrder(max_code, elementNumber)).toStrictEqual(range09);
  // });

  // test('inverse of intToPermOrder also works', () => {
  //   let code = Math.ceil(Math.random() * max_code);
  //   expect(permOrderToInt(intToPermOrder(code, elementNumber))).toBe(code);
  // });

  // test('performance test', () => {
  //   const start_time = Date.now();
  //   for (let i = 0; i < 10000; i++) {
  //     let code = Math.ceil(Math.random() * max_code);
  //     permOrderToInt(intToPermOrder(code, elementNumber)); // 608/10000
  //     intToPermOrder(code, elementNumber); // 107/10000
  //   }
  //   const end_time = Date.now();
  //   console.log('time lapsed : ', end_time - start_time); // DEV_LOG_TO_REMOVE
  // });
});
