import { CardCode, card_codes, card_code_to_face } from 'poker';
import { fac52, intToPermOrder, permOrderToInt } from 'utils/math';
import { rndBigInt } from 'utils/randomUtil';

export default class Deck {
  code: bigint;
  card_order: number[];
  cards: CardCode[];
  constructor(code: bigint = fac52 - 1n) {
    this.code = code;
    this.card_order = this.decodeDeck(code);
    this.cards = this.card_order.map((i) => card_codes[i]);
  }
  show_deck() {
    const card_faces = this.cards.map((c) => card_code_to_face(c));
    console.log(card_faces.join(' '));
    return card_faces;
  }
  encodeDeck(deck_order: number[]) {
    return permOrderToInt(deck_order);
  }
  decodeDeck(deck_code: bigint) {
    return intToPermOrder(deck_code, 52);
  }
  shuffleDeck() {
    this.code = rndBigInt(fac52);
    this.card_order = this.decodeDeck(this.code);
  }
}

export function encodeDeck(deck_order: number[]) {
  return permOrderToInt(deck_order);
}
export function decodeDeck(deck_code: bigint) {
  return intToPermOrder(deck_code, 52);
}
