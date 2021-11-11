import React from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'

import { Order, ORDER_STATUS } from '../common/types'
import { ORDER_STATUS_BULK_UPDATE_MUTATION } from '../query/OrderStatusBulkUpdateMutation'

interface OrderStatusSelectProps {
  order: Order
}

const OrderStatusSelect: NextPage<OrderStatusSelectProps> = ({ order }) => {
  const { status, id } = order

  const [orderStatusBulkUpdate] = useMutation(ORDER_STATUS_BULK_UPDATE_MUTATION)

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          주문 상태
        </InputLabel>
        <NativeSelect
          defaultValue={status}
          inputProps={{
            name: 'order-status',
            id: `order-status-${id}`,
          }}
          onChange={(e) => {
            orderStatusBulkUpdate({
              variables: {
                orderStatusBulkUpdateInput: {
                  ids: id ? [id] : [],
                  status: e.target.value as ORDER_STATUS,
                },
              },
            })
          }}
        >
          <option value={ORDER_STATUS.SELECT_DONE}>선택 완료 (주문중)</option>
          <option value={ORDER_STATUS.ORDER_DONE}>주문 완료 (조리중)</option>
          <option value={ORDER_STATUS.ORDER_CANCEL}>주문 취소</option>
          <option value={ORDER_STATUS.COOK_DONE}>조리 완료 (배달중)</option>
          <option value={ORDER_STATUS.DELIVERY_DONE}>
            배달 완료 (결제 대기중)
          </option>
          <option value={ORDER_STATUS.PAYMENT_DONE}>결제 완료</option>
        </NativeSelect>
      </FormControl>
    </Box>
  )
}

export default OrderStatusSelect
