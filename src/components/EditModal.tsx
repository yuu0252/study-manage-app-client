import {
  Box,
  Button,
  FormControl,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";

export const EditModal = ({
  open,
  setOpen,
  params,
  submitHandler,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  params: any;
  submitHandler: (input: EventTarget & HTMLFormElement) => void;
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget;
    submitHandler(input);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          height: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "30px",
          borderRadius: "5%",
          backgroundColor: "#fff",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {params.title}
        </Typography>
        <form method="post" onSubmit={(e) => onSubmit(e)}>
          <FormControl sx={{ width: "25ch" }}>
            <OutlinedInput name="text" placeholder="入力してください" />
            <button>作成</button>
            <Button>AI生成</Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};
