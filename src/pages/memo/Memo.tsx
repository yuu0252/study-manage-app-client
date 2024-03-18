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
        padding: "30px",
      }}
    >
      {memo && (
        <>
          <Typography
            variant="h2"
            component="h2"
            sx={{ fontSize: 20, marginBottom: 10 }}
          >
            {memo.title}
          </Typography>
          {memo.content.split("\n").map((p, key) => (
            <Typography key={key} sx={{ marginBottom: 2 }}>
              {p}
            </Typography>
          ))}
        </>
      )}
    </Box>
  );
};
