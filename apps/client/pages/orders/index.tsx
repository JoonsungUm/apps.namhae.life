import React from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { Box, List } from '@mui/material'

import { Order } from '../../common/types'
import { ORDERS_QUERY } from '../../query/OrdersQuery'
import OrderManageCard from '../../components/OrderManageCard'

const OrdersPage: NextPage = () => {
  const { loading, error, data } = useQuery(ORDERS_QUERY, {
    notifyOnNetworkStatusChange: true,
  })
  const { orders } = data || {}

  return (
    <Box>
      <List>
        {orders?.map((order: Order) => (
          <OrderManageCard key={order.id} order={order} />
        ))}
      </List>
    </Box>
  )
}

export default OrdersPage
