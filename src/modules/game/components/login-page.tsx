import { observer } from "mobx-react-lite";
import { Button, Form, Input, InputOtp, Tab, Tabs } from "@heroui/react";
import { LoginType } from "../types";
import {
  ArrowLeftEndOnRectangleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { gameStore } from "../game-store";
import { isMobileDevice } from "../../../utils/is-mobile";

const isMobile = isMobileDevice();

export const LoginPage = observer(() => {
  const { name, roomId, loginType } = gameStore.loginForm;

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

  const disableCreate = !/^[a-zA-Zа-яА-ЯёЁ\s\-_]+$/.test(name);
  const disableJoin = !/^[a-zA-Zа-яА-ЯёЁ\s\-_]+$/.test(name) || !roomId;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginType === LoginType.Create) {
      gameStore.createRoom();

      return;
    }

    if (loginType === LoginType.Join) {
      gameStore.joinRoom();

      return;
    }
  };

  return (
    <Form
      style={{ width: 400 }}
      className="flex flex-col gap-2 items-center p-4 bg-neutral-900 rounded-lg-lg"
      onSubmit={submitHandler}
    >
      <div className="text-large font-bold">Вход</div>

      <Tabs
        selectedKey={loginType}
        onSelectionChange={(key) =>
          gameStore.setFormLoginType(key as LoginType)
        }
        color="primary"
      >
        {options.map(({ title, key }) => (
          <Tab title={title} key={key}></Tab>
        ))}
      </Tabs>
      <Input
        errorMessage="Имя должно состоять только из букв"
        value={name}
        onChange={(event) => gameStore.setFormName(event.target.value)}
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
            onValueChange={(value) => gameStore.setFormRoomId(value)}
          />
        </div>
      ) : null}
      {loginType === LoginType.Create ? (
        <Button
          isDisabled={disableCreate}
          endContent={<PlusCircleIcon className="size-6" />}
          type="submit"
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
          type="submit"
          fullWidth
          color="primary"
        >
          Войти
        </Button>
      ) : null}
      {isMobile ? (
        <div className="text-large">
          Разрешение экрана не поддерживается😞, но можно попробовать
        </div>
      ) : null}
    </Form>
  );
});
