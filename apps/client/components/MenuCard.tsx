import React from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
} from '@mui/material'

import { Menu } from '../common/types'
import { ORDER_CREATE_MUTATION } from '../query/OrderCreateMutation'
// import Link from 'next/link'

interface MenuCardProps {
  menu: Menu
}

const MenuCard: NextPage<MenuCardProps> = ({ menu }) => {
  const { id, storeId, name, price, imageUrl, description } = menu || {}

  const [order, { loading, error }] = useMutation(ORDER_CREATE_MUTATION, {
    variables: {
      orderCreateInput: {
        menuId: menu.id,
        isInCart: true,
        isPaid: false,
      },
    },
    update(cache, { data: { orderCreate } }) {
      cache.modify({
        fields: {
          ordersByStatus(existingOrders = []) {
            return [...existingOrders, orderCreate]
          },
        },
      })
    },
  })

  return (
    <Card>
      {/* <Link href={`/store/${storeId}/menu/${id}`} passHref> */}
      {imageUrl && (
        <CardMedia component="img" height="140" image={imageUrl} alt={name} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" component="div">
          {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography sx={{ width: '100%', textAlign: 'right' }}>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => {
              order()
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Typography>
      </CardActions>
      {/* </Link> */}
    </Card>
  )
}

export default MenuCard
