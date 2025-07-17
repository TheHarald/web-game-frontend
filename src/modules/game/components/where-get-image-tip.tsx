import { PhotoIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Image,
} from "@heroui/react";

export const WhereGetImageTip = () => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button color="secondary" isIconOnly>
          <QuestionMarkCircleIcon className="size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 p-2 items-start">
        <div className="text-medium"> 1. Правой кнопкой по нужной картинке</div>
        <div className="text-medium"> 2.</div>
        <Image src="/how-to-get-image-tip.png" />
        <div className="text-medium"> 3.</div>
        <Button color="primary" isIconOnly>
          <PhotoIcon className="size-6" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};
