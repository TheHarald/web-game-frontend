import { User } from "@heroui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";

export const CurrentUser = observer(() => {
  const { currentUser } = gameStore;

  if (currentUser === undefined) return;

  return <User description={currentUser.id} name={currentUser.name} />;
});
