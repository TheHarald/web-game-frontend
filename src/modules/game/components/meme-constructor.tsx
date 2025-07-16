import { observer } from "mobx-react-lite";

import { Button, Image, Input } from "@heroui/react";
import { gameStore } from "../game-store";

export const MemeConstructor = observer(() => {
  const { imageSrc, memeText } = gameStore.game.memeConstructor;

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>Напишите смешную фразу к картинке</div>
      <Image
        isBlurred
        isZoomed
        fallbackSrc={"/meme-fallback.png"}
        alt="Картинка для мема"
        src={imageSrc}
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
      <Button isDisabled={!memeText} color="primary">
        Отправить
      </Button>
    </div>
  );
});
