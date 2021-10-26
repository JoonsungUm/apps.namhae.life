import React from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'

import { styled } from '@mui/material/styles'
import {
  Box,
  Paper,
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

import { Order } from '../common/types'
import { ORDER_DELETE_MUTATION } from '../query/OrderDeleteMutation'

interface OrderMenuProps {
  order: Order
}

// const OrderMenuCard: NextPage<OrderMenuProps> = ({
//   menuid,
//   menuname,
//   menuprice,
// }) => {

// 메뉴아이템 클릭시 ListItem key값이 순서가 업데이트 됨 -39번줄 order1은 임의로 넣은 값임.
let ListitemKeyValue = ''
const updateCountOrder = () => {
  let ordernumber = 0
  ordernumber++
  const countOrder = `order ${ordernumber}`
  ListitemKeyValue = countOrder
  return countOrder
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const OrderMenuCard: NextPage<OrderMenuProps> = ({ order }) => {
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
              console.log(existingOrders)
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
              {/* <Typography>총합</Typography> */}
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

// return OrderMenuCard {}

/*50번째 줄아래 삭제버튼*/
/*  <DeleteIcon /> */

/* 메뉴개수추가버튼 */
/* <Box sx={{ p: 1, order: 1, borderRadius: 16 }}>+</Box> */
/* <Box sx={{ p: 1, order: 2 }}>1</Box> */
/* <Box sx={{ p: 1, order: 3, borderRadius: 16 }}>-</Box> */

export { OrderMenuCard }
