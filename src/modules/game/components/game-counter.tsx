import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { Slider } from "@heroui/react";
import { WebGameStates } from "../../../types";
import { useMemo } from "react";

export const GameCounter = observer(() => {
  const { users, memes, state } = gameStore.room;

  const max = users.length;

  const value = useMemo(() => {
    if (state === WebGameStates.CreatingMeme) {
      return memes.filter((meme) => meme.text).length;
    }

    if (state === WebGameStates.CreatingImage) {
      return memes.filter((meme) => meme.src).length;
    }

    return users.length;
  }, [users, memes, state]);

  console.log(value);

  if (
    state !== WebGameStates.CreatingMeme &&
    state !== WebGameStates.CreatingImage
  )
    return null;

  return (
    <Slider
      style={{ width: 200 }}
      color="primary"
      maxValue={max}
      value={value}
      minValue={0}
      showSteps={true}
      size="lg"
      step={1}
      hideValue
      aria-label="Game Counter"
    />
  );
});
