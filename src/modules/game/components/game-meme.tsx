import { observer } from "mobx-react-lite";
import { Image } from "@heroui/react";
import type { TMeme } from "../../../types";
type TGameMemeProps = {
  meme: TMeme;
};

export const GameMeme = observer<TGameMemeProps>((props) => {
  const { meme } = props;

  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        isBlurred
        isZoomed
        fallbackSrc={"/meme-fallback.png"}
        alt="Картинка для мема"
        src={meme.src}
        width={320}
        height={320}
      />
      <div className="text-2xl font-bold">{meme.text}</div>
    </div>
  );
});
