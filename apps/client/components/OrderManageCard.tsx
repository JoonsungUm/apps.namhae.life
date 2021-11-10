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
  const { menu } = order

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
    <Card sx={{ mx: 2, my: 0.5, p: 0, position: 'relative' }}>
      <CardContent>
        <Box>
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
        <Grid container sx={{ color: 'text.primary' }}>
          <Grid item xs={4}>
            <Typography textAlign="center">{menu.store?.name}</Typography>
            <Typography variant="h5" textAlign="center">
              {menu.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography textAlign="center">{menu.price}원</Typography>
          </Grid>
          <Grid item xs={4}>
            <OrderStatusSelect />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrderManageCard
