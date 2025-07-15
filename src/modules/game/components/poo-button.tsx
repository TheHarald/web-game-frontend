import { Button } from "@heroui/react";
import { gameStore } from "../game-store";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";

type TPooButtonProps = {
  userId: string;
};

export const PooButton = observer<TPooButtonProps>((props) => {
  const { userId } = props;
  const [isCooldown, setIsCooldown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    let timer: number;

    if (isCooldown && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);

      return;
    }

    if (secondsLeft === 0) {
      setIsCooldown(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isCooldown, secondsLeft]);

  const handlePress = () => {
    if (isCooldown) return;

    gameStore.sendPoo(userId);
    setIsCooldown(true);
    setSecondsLeft(20);
  };

  return (
    <Button
      onPress={handlePress}
      radius="full"
      variant="light"
      isIconOnly
      className="text-xl ml-auto"
      disabled={isCooldown}
    >
      {isCooldown ? `${secondsLeft}с` : "💩"}
    </Button>
  );
});
