import type { Currency, PlayerProps } from "..";

export class Player implements PlayerProps {
  playerID: string;
  displayName: string;
  prefCurrency: Currency;

  constructor(props: PlayerProps) {
    this.playerID = props.playerID;
    this.displayName = props.displayName;
    this.prefCurrency = props.prefCurrency;
  }
}
