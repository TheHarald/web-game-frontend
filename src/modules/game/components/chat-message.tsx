import type { TMessage } from "../../../types";

type TChatMessageProps = {
  message: TMessage;
  my: boolean;
};

export const ChatMessage = (props: TChatMessageProps) => {
  const { message, my } = props;
  const { content, sender } = message;

  const owningClassname = my ? "self-end" : "self-start";

  return (
    <div className={"flex flex-col ".concat(owningClassname)}>
      <div className={"text-xs ".concat(owningClassname)}>{sender.name}</div>
      <div
        className={"rounded-lg p-1 break-all w-full text-sm ".concat(
          my ? "bg-primary-500" : "bg-slate-500"
        )}
      >
        {content}
      </div>
    </div>
  );
};
