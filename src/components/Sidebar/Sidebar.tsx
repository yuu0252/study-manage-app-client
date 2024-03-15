import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Category } from "./Category";
import { useEffect, useState } from "react";
import { categoryApi } from "../../api/categoryApi";
import { TypeCategory } from "../../type";
import AddIcon from "@mui/icons-material/Add";

export const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const createCategory = () => {
    const params = { title: "title" };
    categoryApi
      .create(params)
      .then(() => getAllCategories())
      .catch((err) => console.error(err));
  };

  const getAllCategories = () => {
    categoryApi
      .getAll()
      .then((res) => setCategories(res.data))
      .catch(() => alert("カテゴリの取得に失敗しました"));
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
          <ListItemButton onClick={() => createCategory()}>
            <AddIcon />
            <ListItemText primary="新しいカテゴリを作成" />
          </ListItemButton>
          {categories.map((category: TypeCategory) => (
            <Category key={category._id} category={category} />
          ))}
        </List>
      </Drawer>
    </>
  );
};
