import React from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { OrderMenuCard } from './OrderMenu'

import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
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
        <div style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper' }}>
            <Box
              sx={{
                p: 1,
                flexGrow: 1,
                bgcolor: 'white.200',
                padding: '14px',
                textAlign: 'right',
                pt: '18px',
                pr: '30px',
              }}
            >
              장바구니
            </Box>
            <Box sx={{ p: 1, bgcolor: 'white.300' }}>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  fontSize: 5,
                  width: '10px',
                  px: 3,
                  ml: 1,
                  padding: '6px',
                  mt: '6px',
                }}
              >
                전체삭제
              </Button>
            </Box>
          </Box>
        </div>{' '}
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
        <List>{OrderMenuCard}</List>
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
