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
      status
      menu {
        name
        price
        store {
          id
          name
        }
      }
    }
  }
`
