import { gql } from '@apollo/client'

export const ORDERS_BY_STATUS_QUERY = gql`
  query OrdersByStatus($status: String!) {
    ordersByStatus(status: $status) {
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
      }
    }
  }
`
