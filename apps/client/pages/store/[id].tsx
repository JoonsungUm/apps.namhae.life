import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { initializeApollo, addApolloState } from '../../lib/apolloClient'
import { gql, useQuery } from '@apollo/client'

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

import Appbar from '../../components/Appbar'
import OrderDrawer from '../../components/OrderDrawer'

import { Store, Menu } from '../../types'

const BREAK_TIME = 15

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

  const drawerWidth = 240

  const { name, description, menus } = store || {}

  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>{name} - Namhae Life 음식점</title>
        <meta name={name} content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Appbar
        title={name}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

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
                  <MenuCard menu={menu} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
      <OrderDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  )
}

export default StorePage

interface StoreHomeCardProps {
  store: Store
}

const StoreHomeCard: NextPage<StoreHomeCardProps> = ({ store }) => {
  const { name, imageUrl, address, phone, description } = store || {}

  return (
    <Card sx={{ display: 'flex', maxHeight: 400 }}>
      <CardMedia
        component="img"
        sx={{ maxWidth: 500, width: '40%' }}
        image={imageUrl}
        alt={name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            주소: {address}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            전화번호: {phone}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

interface MenuCardProps {
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

const MenuCard: NextPage<MenuCardProps> = ({ menu }) => {
  const { name, price, imageUrl, description } = menu || {}

  return (
    <Card>
      <CardActionArea>
        {imageUrl && (
          <CardMedia component="img" height="140" image={imageUrl} alt={name} />
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
            <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const STORE_QUERY = gql`
  query Store($id: ID!) {
    store(id: $id) {
      id
      name
      description
      imageUrl
      address
      phone
      menus {
        id
        name
        price
        imageUrl
        description
        isLunch
        isDinner
      }
    }
  }
`

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
