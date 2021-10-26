import { gql } from '@apollo/client'

export const ORDER_CREATE_MUTATION = gql`
  mutation OrderCreate($orderCreateInput: OrderCreateInput!) {
    orderCreate(orderCreateInput: $orderCreateInput) {
      id
      storeId
      menuId
      description
      isInCart
      isPaid
    }
  }
`
