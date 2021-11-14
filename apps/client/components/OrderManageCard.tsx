import React from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

import { Order } from '../common/types'
import { ORDER_DELETE_MUTATION } from '../query/OrderDeleteMutation'
import OrderStatusSelect from './OrderStatusSelect'

interface OrderManageProps {
  order: Order
}

const OrderManageCard: NextPage<OrderManageProps> = ({ order }) => {
  const { menu, createdAt } = order

  const createDate = new Date(createdAt).toLocaleString()

  const [orderDelete, { loading, error }] = useMutation(ORDER_DELETE_MUTATION, {
    variables: {
      id: order.id,
    },
    update(cache, { data: { orderDelete } }) {
      cache.modify({
        fields: {
          orders(existingOrders = []) {
            if (orderDelete) {
              const deletedOrder = existingOrders.filter(
                (order: any) => order.__ref !== `Order:${orderDelete.id}`,
              )
              return [...deletedOrder]
            }
          },
        },
      })
    },
  })

  return (
    <Card sx={{ mx: 0, my: 2, p: 0, position: 'relative' }}>
      <CardContent>
        <Box sx={{ mb: '12px' }}>
          <Typography
            variant="subtitle2"
            sx={{ display: 'inline-block', p: '8px' }}
          >
            {createDate}
          </Typography>
          <IconButton
            color="primary"
            aria-label="delete cart item"
            onClick={() => orderDelete()}
            sx={{
              float: 'right',
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <Grid
          container
          columns={{ xs: 4, sm: 12, md: 12 }}
          sx={{ color: 'text.primary' }}
        >
          <Grid item xs={4} sm={4} md={4}>
            <Typography textAlign="center">{menu.store?.name}</Typography>
            <Typography variant="h5" textAlign="center">
              {menu.name}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Typography textAlign="center">{menu.price}원</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <OrderStatusSelect order={order} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrderManageCard
