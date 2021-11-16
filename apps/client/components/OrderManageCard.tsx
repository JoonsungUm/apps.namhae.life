import React, { Fragment } from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'

import { IconButton, Typography, Grid } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

import { Order } from '../common/types'
import { ORDER_DELETE_MUTATION } from '../query/OrderDeleteMutation'
// import OrderStatusSelect from './OrderStatusSelect'

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
    <Fragment>
      <Grid item xs={5} sm={5} md={5} sx={{ p: '20px' }}>
        <Typography>{menu.name}</Typography>
        <Typography>{menu.price}원</Typography>
        <Typography
          variant="body2"
          sx={{ display: 'inline-block', p: '8px', fontSize: '14px' }}
        >
          {createDate}
        </Typography>
      </Grid>
      <Grid item sx={{ alignSelf: 'center' }}>
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
      </Grid>
      <Grid item xs={4} sm={6} md={6} sx={{ textAlign: 'center' }}>
        {/* <OrderStatusSelect order={order} /> */}
      </Grid>
    </Fragment>
  )
}

export default OrderManageCard
