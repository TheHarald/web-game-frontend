import { ImageConstructor } from "./image-constructor";
import { observer } from "mobx-react-lite";
import { MemeConstructor } from "./meme-constructor";
import { gameStore } from "../game-store";
import { WebGameStates } from "../../../types";
import { GameMemeResults } from "./game-meme-results";

export const GameField = observer(() => {
  const { room } = gameStore;
  const { state } = room;

  return (
    <div className="w-100 h-100 flex items-center justify-center flex-1">
      <div className="text-2xl font-bold">
        {(() => {
          switch (state) {
            case WebGameStates.WaitStart: {
              return (
                <div className="flex flex-col gap-4">
                  <div>Ожидание начала игры</div>
                </div>
              );
            }

            case WebGameStates.CreatingImage: {
              return (
                <div className="flex flex-col gap-8 items-center">
                  <ImageConstructor />
                </div>
              );
            }

            case WebGameStates.CreatingMeme: {
              return (
                <div className="flex flex-col gap-8 items-center">
                  <MemeConstructor />
                </div>
              );
            }

            case WebGameStates.WatchMeme: {
              return <GameMemeResults />;
            }

            default: {
              return <div>Что то пошло не так</div>;
            }
          }
        })()}
      </div>
    </div>
  );
});
