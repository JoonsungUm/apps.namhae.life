import React, { useState } from 'react'
import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { initializeApollo, addApolloState } from '../../../lib/apolloClient'
import { gql, useQuery } from '@apollo/client'

import { Box, Grid, Toolbar } from '@mui/material'

import Appbar from '../../../components/Appbar'
import OrderDrawer from '../../../components/OrderDrawer'

import { Store, Menu } from '../../../common/types'

import { STORE_QUERY } from '../../../query/StoreQuery'
import StoreHomeCard from '../../../components/StoreHomeCard'

import MenuCard from '../../../components/MenuCard'

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
                  <MenuCard menu={menu} />
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
