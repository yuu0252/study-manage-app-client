import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Category } from "./Category";

export const Sidebar = () => {
  return (
    <>
      <Drawer variant="permanent" open={true}>
        <List sx={{ width: "250px" }}>
          <ListItemButton href="/">
            <ListItemText primary="ホーム" />
          </ListItemButton>

          <Category />
        </List>
      </Drawer>
    </>
  );
};
