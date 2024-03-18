import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { openaiApi } from "../api/openaiAPI";
import { TypeInput } from "../type";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, setIsLoading } from "../features/loadingSlice";

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
  const dispatch = useDispatch();

  const [isAI, setIsAI] = useState(false);
  const { isLoading } = useSelector(selectLoading);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
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
          justifyContent: "center",
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
        <Button type="button" onClick={() => setIsAI(!isAI)}>
          AI生成
        </Button>
        <TextField label="タイトル" name="title" sx={{ width: "100%" }} />
        {isAI || (
          <TextField
            label="コンテント"
            name="content"
            multiline
            rows={5}
            sx={{ width: "100%" }}
          />
        )}
        <LoadingButton
          loading={isLoading}
          sx={{ width: "100%" }}
          variant="outlined"
          type="submit"
        >
          作成
        </LoadingButton>
      </Box>
    </Modal>
  );
};
