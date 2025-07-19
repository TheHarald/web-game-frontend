import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { GameMeme } from "./game-meme";

export const GameMemeResults = observer(() => {
  const { memes } = gameStore.room;

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {memes.map((meme) => (
        <GameMeme key={meme.id} meme={meme} />
      ))}
    </div>
  );
});
