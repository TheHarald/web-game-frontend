import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { GameMeme } from "./game-meme";
import { ScrollShadow } from "@heroui/react";

export const GameMemeResults = observer(() => {
  const { memes } = gameStore.room;

  return (
    <ScrollShadow
      hideScrollBar
      className="h-[800px] py-6 flex flex-row flex-wrap gap-4"
    >
      {memes.map((meme) => (
        <GameMeme key={meme.id} meme={meme} />
      ))}
      {memes.map((meme) => (
        <GameMeme key={meme.id} meme={meme} />
      ))}
      {memes.map((meme) => (
        <GameMeme key={meme.id} meme={meme} />
      ))}
      {memes.map((meme) => (
        <GameMeme key={meme.id} meme={meme} />
      ))}
      {memes.map((meme) => (
        <GameMeme key={meme.id} meme={meme} />
      ))}
    </ScrollShadow>
  );
});
