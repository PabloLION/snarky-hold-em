/* math helpers */
export { divMod, intToPermOrder, permOrderToInt };

function divMod(k: number, n: number) {
  let q = Math.floor(k / n);
  return [q, k - q * n];
}

/**
 * Convert integer to permutation insert position
 *
 * @param  {number} int: the integer
 * @param  {number} nEle: the number of elements of the permutation
 * @returns {number[]}
 *
 * Example:
 * intToPermInsert(0      , 10) == [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
 * intToPermInsert(3628799, 10) == [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] // 3628799 == factorial(10)-1
 */
function intToPermInsert(int: number, nEle: number): number[] {
  const range = [...Array(nEle).keys()].reverse();
  let current_order = 0;
  const result = [];
  for (const digit of range) {
    [int, current_order] = divMod(int, digit + 1);
    result.unshift(current_order);
  }
  return result;
}

/**
 * Reverse of `intToPermInsert`
 * Convert permutation insert position to integer
 *
 * @param  {number[]} permInsert
 * @returns number
 *
 * Example:
 * permInsertToInt([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]) == 0
 * permInsertToInt([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) == 362879 // 3628799 == factorial(10)-1
 */
function permInsertToInt(permInsert: number[]): number {
  return (
    permInsert
      .slice(0, -1)
      .reduce((acc, curr, ind) => (acc + curr) * (ind + 2)) +
    // +2 [0, 1, 2, 3] should do ((((0*2+1) *3)+2) *4)+3 == 23 == factorial(4)-1
    (permInsert as any).at(-1) // #TS: TS doesn't know `Array.prototype.at`
  );
}

/**
 * Convert a permutation insert position to permutation order
 *
 * @param  {number[]} permInsert: permutation insert position
 * @return {number[]}
 *
 * Example:
 * permInsertToPermOrder([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]) == [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]
 * permInsertToPermOrder([ 0, 1, 2, 3, 2, 1, 3, 4, 6, 5 ]) == [ 0, 5, 1, 6, 7, 9, 4, 8, 2, 3 ]
 * permInsertToPermOrder([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) == [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 *
 * Mathematical principle:
 * Result[k] == How many numbers in Input[indexOf(k)] are smaller than k
 */
function permInsertToPermOrder(permInsert: number[]): number[] {
  let result: Array<number> = [];
  for (const [element, int] of permInsert.entries()) {
    result.splice(int, 0, element);
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
 * permOrderToPermInsert([ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]) == [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
 * permOrderToPermInsert([ 0, 5, 1, 6, 7, 9, 4, 8, 2, 3 ]) == [ 0, 1, 2, 3, 2, 1, 3, 4, 6, 5 ]
 * permOrderToPermInsert([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) == [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
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
 * @param  {number} int
 * @param  {number} nEle
 *
 * Example:
 * intToPermOrder(0      , 10) == [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
 * intToPermOrder(3628799, 10) == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 3628799 == factorial(10)-1
 */
function intToPermOrder(int: number, nEle: number) {
  const permInsert = intToPermInsert(int, nEle);
  return permInsertToPermOrder(permInsert);
}

/**
 * Reverse of `intToPermOrder`
 * Combination of intToPermInsert and permInsertToPermOrder.
 * @param  {number} int
 * @param  {number} nEle
 *
 * Example:
 * intToPermOrder(0      , 10) == [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
 * intToPermOrder(3628799, 10) == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // 3628799 == factorial(10)-1
 */
function permOrderToInt(perOrder: number[]): number {
  return permInsertToInt(permOrderToPermInsert(perOrder));
}
