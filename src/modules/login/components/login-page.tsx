import { observer } from "mobx-react-lite";
import { loginStore } from "../login-store";
import { Button, Input, InputOtp, Tab, Tabs } from "@heroui/react";
import { LoginType } from "../types";
import {
  ArrowLeftEndOnRectangleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export const LoginPage = observer(() => {
  const { name, roomId, loginType } = loginStore;

  const options = [
    {
      title: "Присоедениться",
      key: LoginType.Join,
    },
    {
      title: "Создать комнату",
      key: LoginType.Create,
    },
  ];

  const disableCreate = !name;
  const disableJoin = !name || !roomId;

  return (
    <div
      style={{ width: 400 }}
      className="flex flex-col gap-2 items-center p-4 bg-neutral-900 rounded-lg"
    >
      <div className="text-large font-bold">Вход</div>

      <Tabs
        selectedKey={loginType}
        onSelectionChange={(key) => loginStore.setLoginType(key as LoginType)}
        color="primary"
      >
        {options.map(({ title, key }) => (
          <Tab title={title} key={key}></Tab>
        ))}
      </Tabs>
      <Input
        value={name}
        onChange={(event) => loginStore.setName(event.target.value)}
        placeholder="Имя"
      />
      {loginType === LoginType.Join ? (
        <div className="flex flex-col g-2 items-center">
          <div>Код комнаты</div>
          <InputOtp
            allowedKeys="^[a-z]*$"
            size="lg"
            length={4}
            value={roomId}
            onValueChange={(value) => loginStore.setRoomId(value)}
          />
        </div>
      ) : null}
      {loginType === LoginType.Create ? (
        <Button
          isDisabled={disableCreate}
          endContent={<PlusCircleIcon className="size-6" />}
          onPress={() => loginStore.createRoom()}
          fullWidth
          color="primary"
        >
          Создать
        </Button>
      ) : null}
      {loginType === LoginType.Join ? (
        <Button
          isDisabled={disableJoin}
          endContent={<ArrowLeftEndOnRectangleIcon className="size-6" />}
          onPress={() => loginStore.joinRoom()}
          fullWidth
          color="primary"
        >
          Войти
        </Button>
      ) : null}
    </div>
  );
});
