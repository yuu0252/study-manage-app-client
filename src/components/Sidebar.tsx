import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ width: '100px' }}>
          <nav>
            <List>
              <ListItem disablePadding>
                <ListItemButton href="/chatgpt">
                  <ListItemText primary="ChatGPT" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Drawer>
    </>
  );
};
