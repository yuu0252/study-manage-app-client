import {
  Box,
  Button,
  Modal,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { openaiApi } from "../api/openaiAPI";
import { TypeInput } from "../type";

export const EditModal = ({
  open,
  setOpen,
  params,
  submitHandler,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  params: any;
  submitHandler: (data: TypeInput) => void;
}) => {
  const [isAI, setIsAI] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    if (isAI) {
      const result = await openaiApi.chat({ prompt: data.title });
      data.content = result.data;
    }

    submitHandler(data);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => setOpen(false)}
    >
      <Box
        component="form"
        onSubmit={(e) => onSubmit(e)}
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
        <p onClick={() => setIsAI(!isAI)}>AI生成</p>
        <TextField
          label="タイトル"
          name="title"
          placeholder="入力してください"
        />
        {isAI || (
          <TextareaAutosize name="content" placeholder="入力してください" />
        )}
        <Button type="submit">作成</Button>
      </Box>
    </Modal>
  );
};
