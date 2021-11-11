import { gql } from '@apollo/client'

export const ORDERS_BY_STATUS_QUERY = gql`
  query OrdersByStatus($status: OrderStatus!) {
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
        store {
          id
          name
        }
      }
    }
  }
`
