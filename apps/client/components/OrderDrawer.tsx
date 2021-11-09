import React from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import OrderMenuCard from './OrderMenuCard'

import { Box, Toolbar, Drawer, List, Button, IconButton } from '@mui/material'
import { ORDERS_QUERY } from '../query/OrdersQuery'
import { Order } from '../common/types'
import { DRAWER_WIDTH } from '../common/const'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

interface OrderDrawerProps {
  mobileOpen: boolean
  handleDrawerToggle: () => void
}

const OrderDrawer: NextPage<OrderDrawerProps> = ({
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
          <Box sx={{ display: 'flex', mx: 1.8, bgcolor: 'background.paper' }}>
            <IconButton onClick={handleDrawerToggle} sx={{ pr: 1 }}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box
              sx={{
                p: 1,
                flexGrow: 1,
                bgcolor: 'white.200',
                padding: '14px',
                textAlign: 'right',
                pt: '18px',
                pr: '22px',
                fontSize: 20,
              }}
            >
              주문내역
            </Box>
            <Box sx={{ p: 1, bgcolor: 'white.300' }}>
              <Button
                size="small"
                variant="outlined"
                sx={{
                  fontSize: 15,
                  width: '90%',
                  px: 2,
                  ml: 1,
                  mx: 2,
                  p: 1,
                  mt: '3px',
                }}
              >
                전체삭제
              </Button>
            </Box>
          </Box>
        </div>
        <List>
          {orders?.map((order: Order) => (
            <OrderMenuCard key={order.id} order={order} />
          ))}
        </List>
        <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper' }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              flex: 'auto',
              fontSize: 18,
              width: '100%',
              px: 3,
              ml: 1,
              padding: '6px',
              mt: '6px',
              mr: 1,
            }}
          >
            메뉴추가
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              flex: 'auto',
              fontSize: 18,
              width: '100%',
              px: 3,
              ml: 1,
              padding: '6px',
              mt: '6px',
              mr: 1,
            }}
          >
            결제하기
          </Button>
        </Box>
      </Box>
    </div>
  )

  return (
    <Box component="nav" aria-label="order lists">
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {orderDrawer}
      </Drawer>
    </Box>
  )
}

export default OrderDrawer
