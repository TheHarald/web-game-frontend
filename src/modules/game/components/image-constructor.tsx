import { observer } from "mobx-react-lite";
import { addToast, Button, Image } from "@heroui/react";
import { gameStore } from "../game-store";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { WhereGetImageTip } from "./where-get-image-tip";
import { ImageModal } from "./image-modal";

export const ImageConstructor = observer(() => {
  const { currentUser, room, game } = gameStore;
  const { imageConstructor } = game;
  const { src, hasError } = imageConstructor;

  const iamgeErrorHandler = () => {
    if (hasError) return;

    addToast({
      title: "Невалидная картинка",
      description: "Попробуйте другую 😔",
      color: "danger",
    });

    gameStore.setImageModalSrc(undefined);
    gameStore.resetConstructorImage();
  };

  console.log("image");

  const myImage = room.memes.find((meme) => meme.authorId === currentUser?.id);

  const disableCreate = Boolean(myImage?.src || hasError || src === undefined);
  const disableDelete = Boolean(myImage?.src) || !src;

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>Вставьте картинку</div>
      <div className="flex flex-row gap-2">
        <Image
          onError={iamgeErrorHandler}
          isBlurred
          isZoomed
          fallbackSrc={"/meme-fallback.png"}
          alt="Картинка для мема"
          src={src}
          width={320}
          height={320}
        />
        <div className="flex flex-col gap-2">
          <Button
            isDisabled={Boolean(src)}
            onPress={() => gameStore.setImageModalOpen(true)}
            color="primary"
            isIconOnly
          >
            <PhotoIcon className="size-6" />
          </Button>
          <Button
            color="danger"
            isDisabled={disableDelete}
            onPress={() => gameStore.resetConstructorImage()}
            isIconOnly
          >
            <TrashIcon className="size-6" />
          </Button>
          <WhereGetImageTip />
        </div>
      </div>
      <Button
        onPress={() => gameStore.finishImageCreate()}
        isDisabled={disableCreate}
        color="primary"
      >
        Отправить
      </Button>
      <ImageModal />
    </div>
  );
});
