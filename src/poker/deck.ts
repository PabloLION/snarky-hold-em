import { CardCode, card_codes, card_code_to_face } from '.';
import { fac52, intToPermOrder, permOrderToInt } from '../utils/math';
import { rndBigInt } from '../utils/randomUtil';
export default class Deck {
  cards: string[];
  constructor() {
    this.cards = Array.from(card_codes).map((c) => card_code_to_face(c));
  }
  deal(): string {
    return this.cards.pop()!;
  }
  static toNum(c: string): string {
    return (
      c.codePointAt(0)!.toString(16) +
      c.codePointAt(1)!.toString(16).padStart(4, '0')
    );
  }
}

export class OldDeck {
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
  deal() {
    if (this.card_order.length === 0) {
      throw new Error('Deck is empty');
    }
    const card_code = this.card_order.pop();
    console.log('card_code : ', card_code); // DEV_LOG_TO_REMOVE

    this.encode();
    return card_code!;
  }
}

// const d = new OldDeck();
// d.show();
// d.shuffle();
// d.show();

export { encodeDeck, decodeDeck }; //for test
function encodeDeck(deck_order: number[]) {
  return permOrderToInt(deck_order);
}
function decodeDeck(deck_code: bigint) {
  return intToPermOrder(deck_code, 52);
}
