import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'

export default function OrderStatusSelect() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          주문 상태
        </InputLabel>
        <NativeSelect
          defaultValue="SELECT_DONE"
          inputProps={{
            name: 'order-status',
            id: 'uncontrolled-native',
          }}
        >
          <option value="SELECT_DONE">선택 완료</option>
          <option value="ORDER_DONE">주문 완료</option>
          <option value="ORDER_CANCEL">주문 취소</option>
          <option value="COOK_DONE">조리 완료</option>
          <option value="DELIVERY_DONE">배달 완료</option>
          <option value="PAYMENT_DONE">결제 완료</option>
        </NativeSelect>
      </FormControl>
    </Box>
  )
}
