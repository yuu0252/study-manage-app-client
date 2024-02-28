import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import {
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer variant="permanent" open={true}>
        <List sx={{ width: '250px' }}>
          <ListItemButton href="/">
            <ListItemText primary="ホーム" />
          </ListItemButton>

          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemText primary="ChatGPT" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
};
