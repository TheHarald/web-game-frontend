import { observer } from "mobx-react-lite";
import { GameRoomPage } from "./modules/game/components/game-room-page";
import { LoginPage } from "./modules/login/components/login-page";
import { gameStore } from "./modules/game/game-store";

export const App = observer(() => {
  const { currentUser } = gameStore;
  return (
    <div className="flex flex-row gap-4">
      {currentUser ? <GameRoomPage /> : <LoginPage />}
    </div>
  );
});

export default App;
