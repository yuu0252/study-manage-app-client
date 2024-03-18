import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TypeCategory, TypeInput, TypeMemo } from "../../type";
import { memoApi } from "../../api/memoApi";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { EditModal } from "../EditModal";
import { Link, useNavigate } from "react-router-dom";
import { categoryApi } from "../../api/categoryApi";
import { setIsLoading } from "../../features/loadingSlice";
import { useDispatch } from "react-redux";

export const Category = ({
  category,
  getAllCategories,
}: {
  category: TypeCategory;
  getAllCategories: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [memos, setMemos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const submitHandler = (data: TypeInput) => {
    const { title, content } = data;

    const params = {
      title: title,
      content: content,
    };

    memoApi
      .create(category._id, params)
      .then(() => {
        getAllMemos();
        setModalIsOpen(false);
      })
      .catch((err) => alert(err.data))
      .finally(() => dispatch(setIsLoading(false)));
  };

  const onClickAddMemo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalIsOpen(true);
  };

  const onClickDeleteCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const answer = confirm(`${category.title}を削除しますか？`);
    if (answer) {
      categoryApi
        .delete(category._id)
        .then(() => getAllCategories())
        .catch((err) => console.error(err));
    }
  };

  const onClickDeleteMemo = (
    e: React.MouseEvent<HTMLButtonElement>,
    memoId: string
  ) => {
    e.stopPropagation();
    memoApi
      .delete(category._id, memoId)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
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
        <IconButton onClick={(e) => onClickDeleteCategory(e)}>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton onClick={(e) => onClickAddMemo(e)}>
          <AddIcon />
        </IconButton>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {memos.map((memo: TypeMemo) => (
            <Link
              className="memo-link"
              to={`/categories/${memo.category}/memos/${memo._id}`}
              key={memo._id}
            >
              <ListItemButton>
                <ListItem>
                  <ListItemText primary={memo.title} />
                  <IconButton onClick={(e) => onClickDeleteMemo(e, memo._id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItem>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
      <EditModal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        params={category}
        submitHandler={(data: TypeInput) => submitHandler(data)}
      />
    </>
  );
};
