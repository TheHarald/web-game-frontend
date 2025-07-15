import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";
import { Button, Form, Input, ScrollShadow } from "@heroui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChatMessage } from "./chat-message";

export const RoomChat = observer(() => {
  const { chat, currentUser } = gameStore;

  const { messages, yourMessage } = chat;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    gameStore.sendMessage();
  };

  return (
    <div
      style={{ width: 320, height: 700 }}
      className="flex flex-col bg-neutral-900 rounded-lg p-4"
    >
      <h1 className="text-xl font-medium mb-2">Чат</h1>

      <ScrollShadow hideScrollBar className="flex-1 flex flex-col gap-2 py-4">
        {messages.map((message, i) => {
          return (
            <ChatMessage
              message={message}
              key={i}
              my={currentUser?.id === message.sender.id}
            />
          );
        })}
      </ScrollShadow>

      <Form onSubmit={submitHandler} className="flex flex-row gap-2">
        <Input
          value={yourMessage}
          onChange={(event) => gameStore.setYourMessage(event.target.value)}
          placeholder="Сообщение"
        />
        <Button
          isDisabled={!yourMessage}
          type="submit"
          color="primary"
          isIconOnly
        >
          <PaperAirplaneIcon className="size-6" />
        </Button>
      </Form>
    </div>
  );
});
