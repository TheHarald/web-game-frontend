import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../game-store";

export const ImageModal = observer(() => {
  const { open } = gameStore.imageModal;

  return (
    <Modal isOpen={open} onClose={() => gameStore.setImageModalOpen(false)}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Вставить кратинку
        </ModalHeader>
        <ModalBody>
          <Input
            placeholder="Ссылка на кратинку"
            onChange={(e) => gameStore.setImageModalSrc(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => gameStore.setImageModalOpen(false)}
            color="danger"
            variant="light"
          >
            Отмена
          </Button>
          <Button
            onPress={() => gameStore.setConstructorImageSrc()}
            color="primary"
          >
            Принять
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
