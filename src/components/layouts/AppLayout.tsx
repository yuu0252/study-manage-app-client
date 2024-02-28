import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { SidebarProvider } from '../../contexts/sidebar';
import { Box } from '@mui/material';

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <div>
        <Box sx={{ width: '100%' }}>
          <Sidebar />
          <Box
            sx={{
              flexGrow: 1,
              marginLeft: '250px',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </div>
    </SidebarProvider>
  );
};
