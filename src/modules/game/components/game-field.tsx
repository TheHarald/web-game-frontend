import { ImageConstructor } from "./image-constructor";
import { observer } from "mobx-react-lite";
import { MemeConstructor } from "./meme-constructor";
import { gameStore } from "../game-store";
import { WebGameStates } from "../../../types";
import { Button } from "@heroui/react";
import { GameMemeResults } from "./game-meme-reults";

export const GameField = observer(() => {
  const { currentUser, room } = gameStore;
  const { memes, state } = room;

  const isEveryoneCompleteImage = memes.every((meme) => meme.src);
  const isEveryoneCompleteMeme = memes.every((meme) => meme.text);

  const isAdmin = currentUser?.isAdmin;

  return (
    <div className="w-100 h-100 flex items-center justify-center flex-1">
      <div className="text-2xl font-bold">
        {(() => {
          switch (state) {
            case WebGameStates.WaitStart: {
              return (
                <div className="flex flex-col gap-4">
                  <div>Ожидание начала игры</div>
                  {currentUser?.isAdmin ? (
                    <Button
                      onPress={() => gameStore.startGame()}
                      color="primary"
                    >
                      Начать
                    </Button>
                  ) : null}
                </div>
              );
            }

            case WebGameStates.CreatingImage: {
              return (
                <div className="flex flex-col gap-8 items-center">
                  <ImageConstructor />
                  {isAdmin ? (
                    <Button
                      onPress={() => gameStore.goToMemeCreation()}
                      color="success"
                      isDisabled={!isEveryoneCompleteImage}
                    >
                      К созданию мемов
                    </Button>
                  ) : null}
                </div>
              );
            }

            case WebGameStates.CreatingMeme: {
              return (
                <div className="flex flex-col gap-8 items-center">
                  <MemeConstructor />
                  {isAdmin ? (
                    <Button
                      onPress={() => gameStore.goToMemeResults()}
                      color="success"
                      isDisabled={!isEveryoneCompleteMeme}
                    >
                      К прсоомтру результатов
                    </Button>
                  ) : null}
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
