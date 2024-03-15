import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TypeCategory, TypeMemo } from "../../type";
import { memoApi } from "../../api/memoApi";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { EditModal } from "../EditModal";

export const Category = ({ category }: { category: TypeCategory }) => {
  const [open, setOpen] = useState(false);
  const [memos, setMemos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const submitHandler = (input: any) => {
    const params = {
      title: input.text.value,
      content: "content",
    };

    memoApi
      .create(category._id, params)
      .then(() => {
        getAllMemos();
        setModalIsOpen(false);
      })
      .catch((err) => alert(err.data));
  };

  const onClickAddMemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalIsOpen(true);
  };

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
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={category.title} />
        <IconButton onClick={(e) => onClickAddMemo(e)}>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton onClick={(e) => onClickAddMemo(e)}>
          <AddIcon />
        </IconButton>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {memos.map((memo: TypeMemo) => (
            <ListItemButton key={memo._id} sx={{ pl: 4 }}>
              <ListItemText primary={memo.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <EditModal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        params={category}
        submitHandler={(input: EventTarget & HTMLFormElement) =>
          submitHandler(input)
        }
      />
    </>
  );
};
