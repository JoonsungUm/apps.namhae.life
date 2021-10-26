import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Paper, Card, CardContent } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
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
  <Card sx={{ mx: 2, my: 0.5 }}>
    <CardContent>
      <Typography sx={{ textAlign: 'right' }}>
        <DeleteIcon />
      </Typography>
      <div style={{ width: '100%' }}>
        <Grid container sx={{ color: 'text.primary' }}>
          <Grid item xs={4}>
            <Typography>음식명</Typography>
            <Typography>가격</Typography>
            <Typography>총합</Typography>
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

// return OrderMenuCard {}

/*50번째 줄아래 삭제버튼*/
/*  <DeleteIcon /> */

/* 메뉴개수추가버튼 */
/* <Box sx={{ p: 1, order: 1, borderRadius: 16 }}>+</Box> */
/* <Box sx={{ p: 1, order: 2 }}>1</Box> */
/* <Box sx={{ p: 1, order: 3, borderRadius: 16 }}>-</Box> */

export { OrderMenuCard }
