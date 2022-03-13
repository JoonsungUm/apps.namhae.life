import React from 'react'
import { NextPage } from 'next'

import { Order } from '../common/types'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import OrderManageCard from './OrderManageCard'

interface OrderByStoreListProps {
  orders: Order[]
}

const OrderByStoreList: NextPage<OrderByStoreListProps> = ({ orders }) => {
  const storeIds = orders && orders.map((order) => order.menu.store.id)
  const stores = Array.from(new Set(storeIds))

  const orderPriceTotal =
    orders &&
    orders.reduce((acc, order) => {
      return acc + order.menu.price
    }, 0)

  return (
    <Box>
      {stores.map((storeId) => {
        const storeOrders = orders?.filter(
          (order) => order.menu.store.id === storeId,
        )
        const storeOrderPriceTotal = storeOrders?.reduce(
          (acc, order) => acc + order.menu.price,
          0,
        )
        const store = storeOrders[0]?.menu?.store
        return (
          <Card key={storeId} sx={{ my: 6 }}>
            <CardContent>
              <Grid
                container
                columns={{ xs: 6, sm: 6, md: 6 }}
                sx={{ color: 'text.primary', maxWidth: '600px', mx: 'auto' }}
              >
                <Grid item xs={6} sm={6} md={6}>
                  <Typography variant="h5" textAlign="center">
                    {store?.name}
                  </Typography>
                  <Typography variant="body1" textAlign="center">
                    {store?.address}
                  </Typography>
                  <Typography variant="subtitle1" textAlign="center">
                    <Box component="a" href={`tel:${store?.phone}`}>
                      {store?.phone}
                    </Box>
                  </Typography>
                </Grid>
                {storeOrders?.map((order: Order) => {
                  return <OrderManageCard key={order.id} order={order} />
                })}
                <Grid item xs={6} sm={6} md={6}>
                  <Typography
                    variant="h6"
                    textAlign="right"
                    sx={{ pr: '40px' }}
                  >
                    합계: {storeOrderPriceTotal}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )
      })}
      <Typography variant="h6" textAlign="right" sx={{ pr: '40px' }}>
        모든 주문 합계: {orderPriceTotal}
      </Typography>
    </Box>
  )
}

export default OrderByStoreList
