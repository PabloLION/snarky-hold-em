import { intToPermOrder } from 'utils/math';

export {};

function pass() {
  throw new Error('FUNCTION NOT WRITTEN'); // DEV_LOG_TO_REMOVE
}
async function deploy() {
  await isReady;
  pass();
}
function getSnappState() {
  pass();
}

function encodeDeck() {}
function decodeDeck(deck_code: number) {
  return intToPermOrder(deck_code, 52);
}

function shuffleDeck() {}
function unitTest() {
  const fac52 = BigInt(
    '80658175170943878571660636856403766975289505440883277824000000000000'
  );
  const sample_deck_code = fac52 - BigInt(1); // order of permutation of 0-51, 0=52...0, factorial(52)-1=0...52

  // decodeDeck(sample_deck_code);
  encodeDeck();
  shuffleDeck();
}

unitTest();
