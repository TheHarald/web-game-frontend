import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { WebGameStates } from "../../../types";
import { Button } from "@heroui/react";

export const AdminButtons = observer(() => {
  const { room } = gameStore;

  const { state, memes } = room;

  const isEveryoneCompleteImage = memes.every((meme) => meme.src);
  const isEveryoneCompleteMeme = memes.every((meme) => meme.text);

  switch (state) {
    case WebGameStates.WatchMeme: {
      return (
        <Button color="primary" onPress={() => gameStore.restartGame()}>
          Сыграть еще раз
        </Button>
      );
    }

    case WebGameStates.CreatingImage: {
      return (
        <Button
          color="primary"
          onPress={() => gameStore.goToMemeCreation()}
          isDisabled={!isEveryoneCompleteImage}
        >
          К созданию мемов
        </Button>
      );
    }
    case WebGameStates.CreatingMeme: {
      return (
        <Button
          color="primary"
          onPress={() => gameStore.goToMemeResults()}
          isDisabled={!isEveryoneCompleteMeme}
        >
          К прсоомтру результатов
        </Button>
      );
    }
    case WebGameStates.WaitStart: {
      return (
        <Button onPress={() => gameStore.startGame()} color="primary">
          Начать
        </Button>
      );
    }

    default: {
      return null;
    }
  }
});
