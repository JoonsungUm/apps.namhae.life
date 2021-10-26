import React from 'react'
import { styled } from '@mui/material/styles'
import { Grid, Paper, ListItem } from '@mui/material'

// import { NextPage } from 'next'
// import MenuIcon from '@mui/icons-material/Menu'

// interface OrderMenuProps {
//   menuid: number
//   menuname: string
//   menuprice: number
// }

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

const OrderMenuCard = (
  <div>
    <ListItem key="order1">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </ListItem>
  </div>
)
// return OrderMenuCard
// }

export { OrderMenuCard }
