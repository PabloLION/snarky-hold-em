export function rndBigInt(upperBound: bigint): bigint {
  /* !! may overflow. example below !!*/
  /* UpperBound not included. */
  /* // TODO : use Snarky native rng */
  // suppose BigInt.MAX_VALUE is 0xeff...ff, as the first digit is not "f"
  // then cannot compare with BigInt('0xfff...ff')
  // way to fix this is to use base 2 but using base 16 here for better performance.

  const maxLen = upperBound.toString(16).length;
  /* Idea from https://stackoverflow.com/questions/53894231/generate-big-numbers-with-math-random-in-javascript */
  const genHexStr = () =>
    Array(maxLen)
      .fill(0)
      .map(() => Math.round(Math.random() * 0xf).toString(16))
      .join('');
  let hexString = genHexStr();
  while (BigInt(`0x${hexString}`) >= upperBound) {
    //
    hexString = genHexStr();
  }
  return BigInt(`0x${hexString}`);
}
