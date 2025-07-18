import { Button } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { settings } from "../../../settings/settings";

type TPooButtonProps = {
  onPoo: VoidFunction;
};

export const PooButton = observer<TPooButtonProps>((props) => {
  const { onPoo } = props;
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

    onPoo();
    setIsCooldown(true);
    setSecondsLeft(settings.SEND_POO_DELAY_SEC);
  };

  return (
    <Button
      onPress={handlePress}
      radius="full"
      variant="light"
      size="sm"
      isIconOnly
      className="text-xl ml-auto"
      disabled={isCooldown}
    >
      {isCooldown ? `${secondsLeft}с` : "💩"}
    </Button>
  );
});
