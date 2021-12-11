import { intToPermOrder, permOrderToInt } from './math';

describe('all math test', () => {
  const range09 = [...Array(10).keys()];
  const elementNumber = 10;
  const max_code = 3628799; // = factorial(10)-1
  test('0 should parse to the largest permutation [9...0]', () => {
    expect(intToPermOrder(0, elementNumber)).toStrictEqual(
      range09.slice().reverse()
    );
    // range09.reverse(); // always reverse back next line if not intended
  });
  test('factorial(10)-1 should parse to [0...9]', () => {
    expect(intToPermOrder(max_code, elementNumber)).toStrictEqual(range09);
  });

  test('inverse of intToPermOrder also works', () => {
    let code = Math.ceil(Math.random() * max_code);
    expect(permOrderToInt(intToPermOrder(code, elementNumber))).toBe(code);
  });

  test('performance test', () => {
    const start_time = Date.now();
    for (let i = 0; i < 10000; i++) {
      let code = Math.ceil(Math.random() * max_code);
      permOrderToInt(intToPermOrder(code, elementNumber)); // 608/10000
      intToPermOrder(code, elementNumber); // 107/10000
    }
    const end_time = Date.now();
    console.log('time lapsed : ', end_time - start_time); // DEV_LOG_TO_REMOVE
  });
});
