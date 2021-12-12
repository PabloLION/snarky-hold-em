import {
  Bool,
  // CircuitValue,
  Field,
  // Group,
  isReady,
  // matrixProp,
  method,
  Mina,
  Party,
  Poseidon,
  PrivateKey,
  PublicKey,
  shutdown,
  SmartContract,
  state,
  State,
  UInt64,
} from 'snarkyjs';
import Deck from '../../src/poker/deck';

export { test };

class PokerHost extends SmartContract {
  // gameStage can be a number, maybe can merge to another Field. Is creating multiple fields bad?
  @state(Field) gameStage: State<Field>; // 0 for "no-game", 1 for "pre-flop", 2 for "flop", 3 for "turn", 4 for "river"
  @state(Field) pot: State<Field>;

  /* Is this needed? */
  // @state(Field) result: Field; // winner, post, game process, etc.
  playerIDs: PublicKey[];
  playerCredits: Map<PublicKey, number>; // { [key: string]: number };
  buyIn: number;
  smallBlind: number;
  bigBlind: number;
  deck: Deck;
  lastBB: number;
  // TODO: limit:number;
  // Array<number>; // ?TS: How to make sure length == 52?

  constructor(
    address: PublicKey,
    buyIn: number = 1000,
    smallBlind: number = 10,
    bigBlind: number = 20,
    deck: Deck = new Deck()
  ) {
    super(address);
    this.buyIn = buyIn;
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;
    this.playerIDs = [];
    this.playerCredits = new Map();
    this.gameStage = State.init(new Field(0));
    // this.cardDeck = State.init(new Field(0));
    this.pot = State.init(new Field(0));
    this.deck = deck;
    this.lastBB = 0;
  }
  // showDeck(callerID: PublicKey) {
  //   if (callerID !== this.address) {
  //     throw new Error('Only the host can show the deck');
  //   }
  //   // return this.deck.show();
  // }
  // shuffleDeck(callerID: PublicKey) {
  //   if (callerID !== this.address) {
  //     throw new Error('Only the host can shuffle the deck');
  //   }
  //   // this.deck.shuffle();
  //   console.log('[HOST]: Host shuffled deck');
  // }
  @method acceptPlayer(playerID: PublicKey) {
    // check buy-in
    // TODO: user can pay more buy-in, less than limit
    console.error(
      "buy-in transaction not confirmed: I don't now how to check."
    );

    this.playerCredits.set(playerID, this.buyIn);
    // add to playersID
    console.log('[HOST]: Player accepted');
    this.playerIDs.push(playerID);
  }
  @method assertPlayer(playerID: PublicKey) {
    /* check if playerID is in playersID */
    this.playerIDs
      .map((id) => playerID.equals(id))
      .reduce(Bool.or)
      .assertEquals(true);
    console.log(`[HOST]: Player is in the game`);
    //? How to show username?
    console.error(
      `This cannot be used as username ${playerID.toJSON()?.toString()}`
    );
    return true;
  }

  @method dealCard(receiver: PublicKey) {
    /* deal one card to receiver */
    // check if receiver is in playersID
    this.assertPlayer(receiver);
    const cardStr = Deck.toNum(this.deck.deal());
    const messageWithCard = [Field(cardStr)].concat(receiver.toFields());
    Poseidon.hash(messageWithCard); // encrypt with Obfuscation
    return true;
  }

  @method async dealStartingHand(receiver: PublicKey) {
    /* check if gameStage is 1, pre-flop */
    const stage = await this.gameStage.get();
    stage.assertEquals(0);
    this.gameStage.set(stage);
    /*  */
    console.info(`[HOST]: Deal starting hand to {PLAYER_NAME}`);
    this.dealCard(receiver);
    this.dealCard(receiver);
    this.dealCard(receiver);
  }

  @method async goNextStage() {
    const stage = await this.gameStage.get();
    stage.assertEquals(0);
    stage.add(1);
    this.gameStage.set(stage);
  }
  @method declareWinner(playerID: PublicKey) {
    // const stage = await this.gameStage.get();
    this.gameStage.set(new Field(0));
    if (this.playerIDs.length === 0) {return UInt64.fromNumber(0);}
    else {
    const total = this.playerIDs.reduce((acc,id) => acc +(this.playerCredits.get(id)??0), 0);
    return UInt64.fromNumber(total);}
  }
}



async function test() {
  /* ENV: Local Chain */
  await isReady;

  const snappPrivateKey = PrivateKey.random();
  const snappPublicKey = snappPrivateKey.toPublicKey();
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  let pokerHost: PokerHost;

  /* Deploy snapp */

  /* wait players to join */
  /* create players */
  const betPool = Local.testAccounts[0].privateKey;
  const player1 = Local.testAccounts[1].privateKey;
  const player2 = Local.testAccounts[2].privateKey;
  const player1ID = player1.toPublicKey();
  const player2ID = player2.toPublicKey();

  // console.log('player1.toFields()  : ', player1.toFields()); // DEV_LOG_TO_REMOVE
  // host a poker game
  await Mina.transaction(betPool, async () => {
    pokerHost = new PokerHost(snappPublicKey);
    // pokerHost.showDeck(snappPublicKey); // How to make it only callable by admin?
    console.log('Host ready'); // DEV_LOG_TO_REMOVE
  })
    .send()
    .wait();

  // player1 wants to join
  /* //? how to reuse for player2? */
  await Mina.transaction(player1, async () => {
    const amount = UInt64.fromNumber(pokerHost.buyIn);
    const p = await Party.createSigned(betPool);
    p.balance.subInPlace(amount);
  })
    .send()
    .wait();

  await Mina.transaction(betPool, async () => {
    pokerHost.acceptPlayer(player1ID);
  })
    .send()
    .wait();

  //? how to reuse from player1?
  // player2 wants to join
  await Mina.transaction(player2, async () => {
    const amount = UInt64.fromNumber(pokerHost.buyIn);
    const p = await Party.createSigned(betPool);
    p.balance.subInPlace(amount);
  })
    .send()
    .wait();
  await Mina.transaction(betPool, async () => {
    pokerHost.acceptPlayer(player2ID);
  })
    .send()
    .wait();

  // Pool deals starting hand
  await Mina.transaction(betPool, async () => {
    pokerHost.dealStartingHand(player1ID);
    pokerHost.dealStartingHand(player2ID);
    pokerHost.goNextStage();
  })
    .send()
    .wait();
  // player1 wants to fold
  await Mina.transaction(player1, async () => {
    /* I didn't finish this part */
    // pokerHost.waitForBet(player1);
    // pokerHost.fold(player1);
    const amount = pokerHost.declareWinner(player2ID);
    const p = await Party.createSigned(player2);
    p.balance.subInPlace(amount);
  })
    .send()
    .wait();
}
test();
shutdown();
