import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { GameMeme } from "./game-meme";
import { ScrollShadow } from "@heroui/react";

export const GameMemeResults = observer(() => {
  const { isIAmdin } = gameStore;
  const { memes } = gameStore.room;

  console.log(isIAmdin);

  return (
    <ScrollShadow
      hideScrollBar
      className="h-[800px] py-6 flex flex-row flex-wrap gap-4"
    >
      {memes.map((meme) => (
        <GameMeme key={meme.id} meme={meme} />
      ))}
    </ScrollShadow>
  );
});
