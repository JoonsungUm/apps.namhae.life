import React from 'react'
import { NextPage } from 'next'

import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

interface OrderDrawerProps {
  drawerWidth: number
  mobileOpen: boolean
  handleDrawerToggle: () => void
}
const OrderDrawer: NextPage<OrderDrawerProps> = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const orderDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Typography variant="h6" align="center">
          Orders
        </Typography>
        <List>
          <ListItem button key="order1">
            <ListItemText
              primary="주문한 음식 1"
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
          <ListItem button key="order2">
            <ListItemText
              primary="주문한 음식 2"
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
          <ListItem button key="order3">
            <ListItemText
              primary="주문한 음식 3"
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
          <ListItem button key="order4">
            <ListItemText
              primary="주문한 음식 4"
              sx={{ textAlign: 'center' }}
            />
          </ListItem>
        </List>
      </Box>
    </div>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="order lists"
    >
      <Drawer
        // container={container}
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {orderDrawer}
      </Drawer>
      <Drawer
        anchor="right"
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {orderDrawer}
      </Drawer>
    </Box>
  )
}

export default OrderDrawer
