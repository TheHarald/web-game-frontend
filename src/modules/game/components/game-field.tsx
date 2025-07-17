// import { ImageConstructor } from "./image-constructor";
import { observer } from "mobx-react-lite";
import { MemeConstructor } from "./meme-constructor";
import { gameStore } from "../game-store";
import { WebGameStates } from "../../../types";
import { Button } from "@heroui/react";

export const GameField = observer(() => {
  const { currentUser, game } = gameStore;
  const { state } = game;

  return (
    <div className="w-100 h-100 flex items-center justify-center flex-1">
      <div className="text-2xl font-bold">
        {/* <ImageConstructor /> */}
        {/* <MemeConstructor /> */}

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

            default: {
              return <div>Что то пошло не так</div>;
            }
          }
        })()}
      </div>
    </div>
  );
});
