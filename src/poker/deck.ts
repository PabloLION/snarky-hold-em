import { intToPermOrder, permOrderToInt } from 'utils/math';

export {};

function pass() {
  throw new Error('FUNCTION NOT WRITTEN'); // DEV_LOG_TO_REMOVE
}
function getSnappState() {
  pass();
}

export function encodeDeck(deck_order: number[]) {
  return permOrderToInt(deck_order);
}
export function decodeDeck(deck_code: bigint) {
  return intToPermOrder(deck_code, 52);
}

function shuffleDeck() {}
