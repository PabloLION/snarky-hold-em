import { CardCode, card_codes, card_code_to_face } from '../poker';
import { fac52, intToPermOrder, permOrderToInt } from '../utils/math';
import { rndBigInt } from '../utils/randomUtil';

export default class Deck {
  code: bigint;
  card_order: number[];
  get cards(): CardCode[] {
    return this.card_order.map((i) => card_codes[i]);
  }
  get card_faces() {
    return this.cards.map((c) => card_code_to_face(c));
  }
  constructor(code: bigint = 0n) {
    this.code = code;
    this.card_order = []; // for TS, real number on next line
    this.decode();
  }

  show() {
    console.log(this.card_faces.join(' '));
    return this;
  }
  encode() {
    this.code = encodeDeck(this.card_order);
    return this.code;
  }
  decode() {
    this.card_order = decodeDeck(this.code);
    return this;
  }
  shuffle() {
    this.code = rndBigInt(fac52);
    this.decode();
    return this;
  }
}

const d = new Deck();
d.show();
d.shuffle();
d.show();

export { encodeDeck, decodeDeck }; //for test
function encodeDeck(deck_order: number[]) {
  return permOrderToInt(deck_order);
}
function decodeDeck(deck_code: bigint) {
  return intToPermOrder(deck_code, 52);
}
