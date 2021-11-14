import React from 'react'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { Box } from '@mui/material'

import { initializeApollo, addApolloState } from '../../../../lib/apolloClient'
import { Menu } from '../../../../common/types'
import { MENU_QUERY } from '../../../../query/MenuQuery'

const MenuPage: NextPage = () => {
  const router = useRouter()
  const { menuId } = router.query

  const { loading, error, data } = useQuery(MENU_QUERY, {
    variables: { id: menuId },
    notifyOnNetworkStatusChange: true,
  })
  const { menu } = data || {}

  const { name, price, description, imageUrl, isLunch, isDinner } = menu || {}

  return <Box>test</Box>
}

export default MenuPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  console.log(params)
  const { menuId }: any = params

  const menuQueryVariables = { id: menuId }

  const data = await apolloClient.query({
    query: MENU_QUERY,
    variables: menuQueryVariables,
    notifyOnNetworkStatusChange: true,
  })

  const { menu } = data.data || {}

  return addApolloState(apolloClient, {
    props: { menu },
    revalidate: 10,
  })
}

const MENU_COUNT_QUERY = gql`
  query MenuCount {
    menus {
      id
      storeId
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const data = await apolloClient.query({
    query: MENU_COUNT_QUERY,
  })

  const { menus } = data.data
  const paths = menus.map((menu: Menu) => ({
    params: {
      id: menu.storeId,
      menuId: menu.id,
    },
  }))

  return { paths, fallback: false }
}
