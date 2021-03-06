import React from 'react'
import { NextPage } from 'next'

import { Store } from '../common/types'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

interface StoreHomeCardProps {
  store: Store
}

const StoreHomeCard: NextPage<StoreHomeCardProps> = ({ store }) => {
  const { name, imageUrl, address, phone, description } = store || {}

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          sx={{
            maxHeight: 250,
            width: '100%',
          }}
          image={imageUrl}
          alt={name}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            주소: {address}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            전화번호: {phone}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default StoreHomeCard
