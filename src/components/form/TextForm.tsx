import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, setIsLoading } from "../../features/loadingSlice";
import { openaiApi } from "../../api/openaiAPI";
import { TypeInput } from "../../type";

export const TextForm = ({
  params,
  submitHandler,
  isContent,
}: {
  params: any;
  submitHandler: (data: TypeInput) => void;
  isContent: boolean;
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
      <TextField label="タイトル" name="title" sx={{ width: "100%" }} />

      {isContent && (
        <>
          <TextField
            disabled={isAI}
            label="コンテンツ"
            name="content"
            multiline
            rows={5}
            sx={{ width: "100%" }}
          />
          <FormControlLabel
            control={<Switch onChange={(e) => setIsAI(e.target.checked)} />}
            label="AI生成"
            sx={{ marginRight: 0, marginLeft: "auto" }}
          />
        </>
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
  );
};
