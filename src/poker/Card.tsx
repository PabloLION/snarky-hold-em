import { useMemo } from "react";
import { CardCode, cardSpriteOrder } from ".";

interface CardProps {
  code: CardCode;
}
export function Card(props: React.PropsWithChildren<CardProps>) {
  const carIndex = useMemo(() => {
    return cardSpriteOrder.indexOf(props.code);
  }, [props.code]);

  return (
    <div
      style={{
        backgroundImage: "url('assets/cards-sprite.png')",
        backgroundRepeat: "no-repeat",
        display: "block",
        backgroundSize: "5300%",
        width: "150px",
        height: "210px",
        backgroundPosition: `${
          1.9230769230769230769230769230769 * carIndex
        }% 0`,
      }}
    >
      {props.code}
      {carIndex}
    </div>
  );
}
