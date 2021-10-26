import { gql } from '@apollo/client'

export const ORDER_DELETE_MUTATION = gql`
  mutation OrderDelete($id: ID!) {
    orderDelete(id: $id) {
      id
    }
  }
`
