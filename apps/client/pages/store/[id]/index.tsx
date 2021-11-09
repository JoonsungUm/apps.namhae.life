import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { initializeApollo, addApolloState } from '../../../lib/apolloClient'
import { gql, useQuery, useMutation } from '@apollo/client'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import {
  Box,
  Grid,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
} from '@mui/material'

import Appbar from '../../../components/Appbar'
import OrderDrawer from '../../../components/OrderDrawer'

import { Store, Menu } from '../../../common/types'
import { ORDER_CREATE_MUTATION } from '../../../query/OrderCreateMutation'
import { STORE_QUERY } from '../../../query/StoreQuery'
import { BREAK_TIME } from '../../../common/const'
import StoreHomeCard from '../../../components/StoreHomeCard'
import Link from 'next/link'

const StorePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [mobileOpen, setMobileOpen] = useState(false)

  const { loading, error, data } = useQuery(STORE_QUERY, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  })
  const { store } = data || {}

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const { name, description, menus } = store || {}

  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>{name} - Namhae Life 음식점</title>
        <meta name={name} content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Appbar title={name} handleDrawerToggle={handleDrawerToggle} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ marginBottom: 5 }}>
            <StoreHomeCard store={store} />
          </Box>

          <Grid
            container
            spacing={{ xs: 2, sm: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {menus &&
              menus.map((menu: Menu, index: number) => (
                <Grid key={index} item xs={4} sm={4} md={4}>
                  <MenuCard storeId={id as string} menu={menu} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
      <OrderDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  )
}

export default StorePage

interface MenuCardProps {
  storeId: string
  menu: Menu
}

const isMenuAvailable = (menu: Menu): boolean => {
  const currentTime = new Date().getHours()

  if (currentTime < BREAK_TIME) {
    return menu.isLunch
  } else {
    return menu.isDinner
  }
}

const MenuCard: NextPage<MenuCardProps> = ({ storeId, menu }) => {
  const { id, name, price, imageUrl, description } = menu || {}

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
      <Link href={`/store/${storeId}/menu/${id}`} passHref>
        <CardActionArea>
          {imageUrl && (
            <CardMedia
              component="img"
              height="140"
              image={imageUrl}
              alt={name}
            />
          )}
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={isMenuAvailable(menu) ? 'text.primary' : 'text.secondary'}
            >
              {name}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              color={isMenuAvailable(menu) ? 'text.primary' : 'text.secondary'}
            >
              {price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography sx={{ textAlign: 'right' }}>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  order()
                }}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { id }: any = params

  const storeQueryVariables = { id }

  const data = await apolloClient.query({
    query: STORE_QUERY,
    variables: storeQueryVariables,
    notifyOnNetworkStatusChange: true,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10,
  })
}

const STORE_COUNT_QUERY = gql`
  query StoreCount {
    stores {
      id
    }
  }
`

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const data = await apolloClient.query({
    query: STORE_COUNT_QUERY,
  })

  const { stores } = data.data
  const paths = stores.map((store: Store) => ({ params: { id: store.id } }))

  return { paths, fallback: false }
}
