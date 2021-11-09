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
    <Card sx={{ mx: 2, my: 0.5 }}>
      <CardContent>
        <Typography sx={{ textAlign: 'right' }}>
          <IconButton
            color="primary"
            aria-label="delete cart item"
            onClick={() => orderDelete()}
          >
            <DeleteIcon />
          </IconButton>
        </Typography>
        <div style={{ width: '100%' }}>
          <Grid container sx={{ color: 'text.primary' }}>
            <Grid item xs={4}>
              <Typography>{menu.name}</Typography>
              <Typography>{menu.price}</Typography>
            </Grid>
            <Grid item xs={8} sx={{ pl: '20px' }}>
              <Typography>
                <Box style={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      p: 1,
                    }}
                  ></Box>
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderManageCard
