import { gql } from '@apollo/client'

export const ORDER_STATUS_BULK_UPDATE_MUTATION = gql`
  mutation OrderStatusBulkUpdate(
    $orderStatusBulkUpdateInput: OrderStatusBulkUpdateInput!
  ) {
    orderStatusBulkUpdate(
      orderStatusBulkUpdateInput: $orderStatusBulkUpdateInput
    ) {
      id
      status
    }
  }
`
