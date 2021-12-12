import { fac52 } from './math';
import { rndBigInt } from './randomUtil';

describe('all math test', () => {
  test('correct random BigInt generator', () => {
    for (let i = 0; i < 100; i++) {
      const rnd = rndBigInt(fac52);
      console.log('rnd : ', rnd);
      expect(rnd).toBeLessThan(fac52);
    }
  });

  test('performance', () => {
    const start_time = Date.now(); // 1229,1250,1259/10000
    for (let i = 0; i < 10000; i++) {
      let a = rndBigInt(fac52);
    }
    const end_time = Date.now();
    console.log('time lapsed : ', end_time - start_time); // DEV_LOG_TO_REMOVE
  });
});
