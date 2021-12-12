/* math helpers */
// I cannot make this work with TS. I want NumType to be one of number or bigint.
// All Arrays should be number.
type NumType = bigint; // number | bigint;
export { divMod, intToPermOrder, permOrderToInt };
export const fac52 = BigInt(
  '80658175170943878571660636856403766975289505440883277824000000000000'
);

function divMod(bK: NumType, bN: NumType): [NumType, NumType] {
  let bQ: NumType = bK / bN;
  let bR: NumType = ((bK % bN) + bN) % bN;
  return [bQ, bR];
}

/**
 * Convert integer to permutation insert position
 *
 * @param   {NumType} int: the integer
 * @param   {NumType} nEle: the number of elements of the permutation
 * @returns {number[]}
 *
 * Example:
 * intToPermInsert(0      , 10) // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
 * intToPermInsert(3545705, 10) // [ 0, 1, 2, 3, 2, 1, 3, 4, 6, 5 ]
 * intToPermInsert(3628799, 10) // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] // 3628799 == factorial(10)-1
 */
function intToPermInsert(int: NumType, nEle: number): number[] {
  /* NumType == bigint */
  let one = 1n;
  let current_order = 0n;
  let nCompatible = BigInt(nEle);
  let result = [];
  /* NumType == number */
  // let one = 1;
  // let current_order = 0;
  // let dm = divMod;

  for (let digit = nCompatible - one; digit >= 0; digit--) {
    [int, current_order] = divMod(int, digit + one);
    result.unshift(Number(current_order));
  }
  return result;
}

/**
 * Reverse of `intToPermInsert`
 * Convert permutation insert position to integer
 *
 * @param  {number[]} permInsert
 * @returns {NumType}
 *
 * Example:
 * permInsertToInt([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]) // 0
 * permInsertToInt([ 0, 1, 2, 3, 2, 1, 3, 4, 6, 5 ]) // 3545705
 * permInsertToInt([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) // 3628799 == factorial(10)-1
 */
function permInsertToInt(permInsert: number[]): NumType {
  // Why `ind+2`: [0, 1, 2, 3] should do ((((0*2+1) *3)+2) *4)+3 == 23 == factorial(4)-1
  /* For number */
  // return (
  //   permInsert
  //     .slice(0, -1)
  //     .reduce((acc, curr, ind) => (acc + curr) * (ind + 2)) +
  //   (permInsert as any).at(-1) // #TS: TS doesn't know `Array.prototype.at`
  // );

  /* For bigint , or both */
  let result = 0n;
  for (const [ind, curr] of permInsert.slice(0, -1).entries()) {
    result = (result + BigInt(curr)) * BigInt(ind + 2);
  }
  return result + BigInt((permInsert as any).at(-1));
}

/**
 * Convert a permutation insert position to permutation order
 *
 * @param  {number[]} permInsert: permutation insert position
 * @return {number[]}
 *
 * Example:
 * permInsertToPermOrder([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]) // [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]
 * permInsertToPermOrder([ 0, 1, 2, 3, 2, 1, 3, 4, 6, 5 ]) // [ 0, 5, 1, 6, 7, 9, 4, 8, 2, 3 ]
 * permInsertToPermOrder([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 *
 * Mathematical principle:
 * Result[k] == How many numbers in Input[indexOf(k)] are smaller than k
 */
function permInsertToPermOrder(permInsert: number[]): number[] {
  let result: Array<number> = [];
  for (const [element, ind] of permInsert.entries()) {
    result.splice(ind, 0, element);
  }
  return result;
}

/**
 * Reverse of `permInsertToPermOrder`
 * Convert a permutation order to permutation insert position
 *
 * @param  {number[]} permInsert: permutation insert position
 * @return {number[]}
 *
 * Example:
 * permOrderToPermInsert([ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]) // [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
 * permOrderToPermInsert([ 0, 5, 1, 6, 7, 9, 4, 8, 2, 3 ]) // [ 0, 1, 2, 3, 2, 1, 3, 4, 6, 5 ]
 * permOrderToPermInsert([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 */
function permOrderToPermInsert(permOrder: number[]): number[] {
  let result = Array(permOrder.length).fill(0);
  permOrder.forEach((ele1, ind1) =>
    permOrder.forEach((ele2, ind2) =>
      ele1 < ele2 && ind1 < ind2 ? result[ele2]++ : null
    )
  );
  return result;

  /*  // below was improved to a faster algorithm to save ~1/2 time:
  let result: Array<number> = [];
  for (const [ele] of permOrder.entries()) {
    let eleInd = permOrder.indexOf(ele);
    let inversion = permOrder
      .slice(0, eleInd)
      .reduce((acc, curr) => acc + (curr < ele ? 1 : 0), 0);
    result.push(inversion);
  }
  return result;
 */
}

/**
 * Convert integer to permutation order
 * Combination of intToPermInsert and permInsertToPermOrder.
 * @param  {NumType} int
 * @param  {NumType} nEle
 *
 * Example:
 * intToPermOrder(0      , 10) // [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
 * intToPermOrder(3545705, 10) // [0, 5, 1, 6, 7, 9, 4, 8, 2, 3]
 * intToPermOrder(3628799, 10) // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3628799 == factorial(10)-1
 */
function intToPermOrder(int: NumType, nEle: number): number[] {
  const permInsert = intToPermInsert(int, nEle);
  return permInsertToPermOrder(permInsert);
}
/**
 * Reverse of `intToPermOrder`
 * Combination of intToPermInsert and permInsertToPermOrder.
 * @param  {NumType} int
 * @param  {NumType} nEle
 *
 * Example:
 * permOrderToInt([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]) // 0
 * permOrderToInt([0, 5, 1, 6, 7, 9, 4, 8, 2, 3]) // 3545705
 * permOrderToInt([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) // 3628799 == factorial(10)-1
 */
function permOrderToInt(perOrder: number[]): NumType {
  return permInsertToInt(permOrderToPermInsert(perOrder));
}

// let code: bigint = rndBigInt(fac52);
// permOrderToInt(intToPermOrder(code, elementNumber));
