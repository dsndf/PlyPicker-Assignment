import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { PinturaEditor } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  changeImagePreviewHandler: (file: any) => void;
};

export default function ImageCropModal({
  isOpen,
  onClose,
  image,
  changeImagePreviewHandler,
}: Props) {
  const [inlineResult, setInlineResult] = useState<{
    data: string;
    file: File;
  } | null>(null);
  const closeHanlder = () => {
    changeImagePreviewHandler(inlineResult);
    onClose();
  };
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <div className="h-[300px] overflow-hidden relative ">
                <PinturaEditor
                  {...getEditorDefaults()}
                  src={image}
                  onProcess={(res) => {
                    alert(typeof res.dest);
                    setInlineResult({
                      data: URL.createObjectURL(res.dest),
                      file: res.dest,
                    });
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isDisabled={!inlineResult}
                onPress={closeHanlder}
              >
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
