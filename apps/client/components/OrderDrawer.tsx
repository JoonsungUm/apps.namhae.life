import React from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'

import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

import { ORDERS_QUERY } from '../query/OrdersQuery'
import { Order } from '../types'

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
  const { loading, error, data } = useQuery(ORDERS_QUERY)
  const { orders } = data || {}

  const orderDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <Typography variant="h6" align="center">
          Orders
        </Typography>
        <List>
          {orders?.map((order: Order) => (
            <ListItem button key={order.id}>
              <ListItemText
                primary={order.menu.name}
                sx={{ textAlign: 'center' }}
              />
              <ListItemText
                secondary={order.menu.price}
                sx={{ textAlign: 'center' }}
              />
            </ListItem>
          ))}
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
