import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { memoApi } from "../../api/memoApi";
import { TypeMemo } from "../../type";

export const Memo = () => {
  const { categoryId, memoId } = useParams();
  const [memo, setMemo] = useState<TypeMemo>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!categoryId || !memoId) return;
    memoApi
      .getOne(categoryId, memoId)
      .then((res) => setMemo(res.data))
      .catch(() => navigate("/"));
  }, [categoryId, memoId]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {memo && (
        <>
          <Typography variant="h3" component="h3">
            {memo.title}
          </Typography>
          <Typography>{memo.content}</Typography>
        </>
      )}
    </Box>
  );
};
