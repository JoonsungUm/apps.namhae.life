import React, { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { useQuery } from '@apollo/client'
import { Box, Toolbar, List } from '@mui/material'

import { subHours } from 'date-fns'

import Appbar from '../../components/Appbar'
import OrderDrawer from '../../components/OrderDrawer'

import { Order } from '../../common/types'
import { ORDERS_QUERY } from '../../query/OrdersQuery'
import OldOrderCard from '../../components/OldOrderCard'
import { RECENT_ORDER_THRESHOLD } from '../../common/const'
import { isRecentOrder } from '../../common/utils'

const OrdersPage: NextPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const { loading, error, data } = useQuery(ORDERS_QUERY, {
    notifyOnNetworkStatusChange: true,
  })
  const { orders } = data || {}

  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>Namhae Life App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Appbar
        title="Namhae Life 주문관리"
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box>
          <List>
            {orders?.map((order: Order) => {
              if (isRecentOrder(order) === false) {
                return <OldOrderCard key={order.id} order={order} />
              }
            })}
          </List>
        </Box>
      </Box>

      <OrderDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  )
}

export default OrdersPage
