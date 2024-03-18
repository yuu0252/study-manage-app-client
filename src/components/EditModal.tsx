import { Modal } from "@mui/material";
import { TypeInput } from "../type";
import { TextForm } from "./form/TextForm";

export const EditModal = ({
  open,
  setOpen,
  params,
  submitHandler,
  isContent,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  params: any;
  submitHandler: (data: TypeInput) => void;
  isContent: boolean;
}) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => setOpen(false)}
    >
      <TextForm
        isContent={isContent}
        params={params}
        submitHandler={submitHandler}
      />
    </Modal>
  );
};
