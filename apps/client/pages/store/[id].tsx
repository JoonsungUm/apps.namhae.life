import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'

import {
  Box,
  Grid,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material'

import Appbar from '../../components/Appbar'
import OrderDrawer from '../../components/OrderDrawer'

import { stores } from '../../data/stores'

import { Store, Menu } from '../../types'


const BREAK_TIME = 15

interface StoreProps {
  store: Store
  menus: Menu[]
}

const StorePage: NextPage<StoreProps> = ({ store, menus }) => {
  const [ mobileOpen, setMobileOpen ] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawerWidth = 240

  const { name, description } = store

  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>{name} - Namhae Life 음식점</title>
        <meta name={name} content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Appbar
        title={name}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ marginBottom: 5 }}>
            <StoreHomeCard store={store} />
          </Box>

          <Grid container spacing={{ xs: 2, sm: 3}} columns={{ xs: 4, sm: 8, md: 12 }}>
            {menus.map((menu, index) => (
              <Grid key={index} item xs={4} sm={4} md={4}>
                <MenuCard
                  menu={menu}
                >
                </MenuCard>
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
  const { id, name, image, address, phone, description } = store

  return (
    <Card sx={{ display: 'flex', maxHeight: 400 }}>
      <CardMedia
        component="img"
        sx={{ maxWidth: 500, width: '40%' }}
        image={image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            주소: {address}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            전화번호: {phone}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
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
  const { id, name, price, image, description } = menu

  return (
    <Card>
      <CardActionArea>
        {image && (
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color={isMenuAvailable(menu) ? "text.primary" : "text.secondary"}>
            {name}
          </Typography>
          <Typography variant="body1" component="div" color={isMenuAvailable(menu) ? "text.primary" : "text.secondary"}>
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id }: any = params

  const store = stores.find((store) => store.id === id)
  const { menus }: { menus: Menu[] } = await import(`../../data/menus/${id}.tsx`)

  return {
    props: {
      store,
      menus,
    },
  }
}

export async function getStaticPaths() {
  const paths = stores.map((store) => ({ params: { id: store.id } }))

  return { paths, fallback: false }
}
