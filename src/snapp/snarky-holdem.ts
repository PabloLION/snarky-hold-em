import { stringify } from 'querystring';
import {
  Bool,
  CircuitValue,
  Field,
  isReady,
  matrixProp,
  method,
  Mina,
  Party,
  Poseidon,
  PrivateKey,
  PublicKey,
  SmartContract,
  state,
  State,
  UInt64,
} from 'snarkyjs';

import { GenericField as GField } from './customized-snarky';
export { deploy, getSnappState };

// TEMP_FOR_DEV await isReady
// isReady.then(() => console.log('Snapp is ready'));
// const waitReady = setTimeout(() => {
//   console.log('Snapp is ready');
// }, 999000);
// clearTimeout(waitReady);
class PokerHost extends SmartContract {
  // gameStage can be a number, maybe can merge to another Field. Is creating multiple fields bad?
  // @state(Field) gameStage: State<GField<string>>;
  // @state(Field) cardDeck: State<GField<number>>; // maybe can anti-cheat
  // @state(Field) pot: State<GField<number>>;

  // @state(Field) gameStage: State<Field>;
  // @state(Field) cardDeck: State<Field>; // maybe can anti-cheat
  // @state(Field) pot: State<Field>;

  // @state(Field) result: Field; // winner, post, game process, etc. Is this needed?
  playersID: Field[];
  buyIn: number;
  smallBlind: number;
  bigBlind: number;

  constructor(
    address: PublicKey,
    buyIn: number,
    smallBlind: number,
    bigBlind: number
  ) {
    super(address);
    this.buyIn = buyIn;
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;
    this.playersID = [];
    // this.gameStage = State.init(new GField('no-game'));
    // this.cardDeck = State.init(new GField(0));
    // this.pot = State.init(new GField(0));
  }
}

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
function decodeDeck(deck_code: string) {
  deck_code.padStart(52, '0');
  console.log(deck_code);
  console.log(1);
  // charCodeAt;
}
function shuffleDeck() {}
function unitTest() {
  const sample_deck_code = '0';
  decodeDeck(sample_deck_code);
  encodeDeck();
  shuffleDeck();
}
unitTest();
