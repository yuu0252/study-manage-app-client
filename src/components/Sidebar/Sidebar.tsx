import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Category } from "./Category";
import { useEffect, useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import { TypeCategory } from "../../type";
import AddIcon from "@mui/icons-material/Add";
import { EditModal } from "../EditModal";

export const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getAllCategories = () => {
    categoryApi
      .getAll()
      .then((res) => setCategories(res.data))
      .catch(() => alert("カテゴリの取得に失敗しました"));
  };

  const submitHandler = (input: any) => {
    const params = { title: input.text.value };
    categoryApi
      .create(params)
      .then(() => {
        getAllCategories();
        setModalIsOpen(false);
      })
      .catch((err) => alert(err.data));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Drawer variant="permanent" open={true}>
        <List sx={{ width: "250px" }}>
          <ListItemButton href="/">
            <ListItemText primary="ホーム" />
          </ListItemButton>
          <ListItemButton onClick={() => setModalIsOpen(true)}>
            <ListItemText primary="新しいカテゴリを作成" />
            <AddIcon />
          </ListItemButton>
          {categories.map((category: TypeCategory) => (
            <Category
              key={category._id}
              category={category}
              getAllCategories={() => getAllCategories()}
            />
          ))}
        </List>
      </Drawer>
      <EditModal
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        params={{ title: "カテゴリを新規作成" }}
        submitHandler={(input: EventTarget & HTMLFormElement) =>
          submitHandler(input)
        }
      />
    </>
  );
};
