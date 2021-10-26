import { gql } from '@apollo/client'

export const ORDERS_QUERY = gql`
  query Orders {
    orders {
      id
      storeId
      menuId
      description
      isInCart
      isPaid
      menu {
        name
        price
      }
    }
  }
`
