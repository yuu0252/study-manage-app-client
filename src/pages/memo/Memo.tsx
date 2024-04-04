import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { memoApi } from "../../api/memoApi";
import { TypeMemo } from "../../type";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, setIsLoading } from "../../features/loadingSlice";

export const Memo = () => {
  const { categoryId, memoId } = useParams();
  const [memo, setMemo] = useState<TypeMemo>();
  const [isEdit, setIsEdit] = useState(false);

  const { isLoading } = useSelector(selectLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMemo = () => {
    if (!categoryId || !memoId) return;
    memoApi
      .getOne(categoryId, memoId)
      .then((res) => setMemo(res.data))
      .catch(() => navigate("/"));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!memo) return;

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const content = formData.get("content");

    const params = {
      title: title,
      content: content,
    };

    dispatch(setIsLoading(true));
    memoApi
      .update(memo.category, memo._id, params)
      .then(() => {
        getMemo();
        setIsEdit(false);
      })
      .catch((err) => alert(err.data))
      .finally(() => dispatch(setIsLoading(false)));
  };

  const onClickDeleteMemo = () => {
    if (!memo) return;
    memoApi
      .delete(memo.category, memo._id)
      .then(() => navigate("/"))
      .catch((err) => console.error(err.data));
  };

  useEffect(() => {
    getMemo();
  }, [categoryId, memoId]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        padding: "30px",
      }}
    >
      {memo &&
        (isEdit ? (
          <Box
            component="form"
            onSubmit={(e) => submitHandler(e)}
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "15px",
              width: "calc(100vw - 250px - 60px)",
            }}
          >
            <TextField
              name="title"
              multiline
              defaultValue={memo.title}
              sx={{ width: "70%" }}
            />
            <TextField
              name="content"
              multiline
              fullWidth
              defaultValue={memo.content}
            />
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              sx={{ marginRight: 0, marginLeft: "auto" }}
            >
              確定
            </LoadingButton>
          </Box>
        ) : (
          <>
            <Typography
              variant="h2"
              component="h2"
              sx={{ width: "70%", fontSize: 20, marginBottom: 5, marginTop: 2 }}
            >
              {memo.title}
            </Typography>

            {memo.content.split("\n").map((p, key) => (
              <Typography key={key} sx={{ marginBottom: 2 }}>
                {p}
              </Typography>
            ))}
          </>
        ))}
      <Box sx={{ position: "absolute", top: "30px", right: "30px" }}>
        <IconButton
          onClick={() => setIsEdit(!isEdit)}
          disableRipple
          sx={{
            "&:hover": { color: "blue" },
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => onClickDeleteMemo()}
          disableRipple
          sx={{
            "&:hover": { color: "red" },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
