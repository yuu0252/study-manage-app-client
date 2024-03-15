import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { TypeCategory, TypeMemo } from "../../type";
import { memoApi } from "../../api/memoApi";

export const Category = ({ category }: { category: TypeCategory }) => {
  const [open, setOpen] = useState(false);
  const [memos, setMemos] = useState([]);

  const getAllMemos = () => {
    memoApi
      .getAll(category._id)
      .then((res) => setMemos(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAllMemos();
  }, []);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={category.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {memos.map((memo: TypeMemo) => (
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={memo.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
