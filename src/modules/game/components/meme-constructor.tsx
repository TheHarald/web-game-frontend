import { observer } from "mobx-react-lite";

import { Button, Image, Input } from "@heroui/react";
import { gameStore } from "../game-store";

export const MemeConstructor = observer(() => {
  const { room, game, currentUser } = gameStore;
  const { memeText } = game.memeConstructor;
  const { memes } = room;

  const memeForMe = memes.find((meme) => meme.forUserId === currentUser?.id);

  const disableMemeCreate = !memeText || Boolean(memeForMe?.text);

  console.log(memeForMe);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>Напишите смешную фразу к картинке</div>
      <Image
        isBlurred
        isZoomed
        fallbackSrc={"/meme-fallback.png"}
        alt="Картинка для мема"
        src={memeForMe?.src}
        width={320}
        height={320}
      />
      <Input
        size="lg"
        placeholder="Собирает мама сына в школу..."
        value={memeText}
        maxLength={30}
        onChange={(event) => gameStore.setMemeText(event.target.value)}
      />
      <Button
        onPress={() => gameStore.funishMemeCreate()}
        isDisabled={disableMemeCreate}
        color="primary"
      >
        Отправить
      </Button>
    </div>
  );
});
