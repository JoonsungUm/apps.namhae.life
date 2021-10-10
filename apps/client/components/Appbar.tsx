import React from 'react'
import { NextPage } from 'next'

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'


export const Appbar: NextPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Namhae Life 식사 배달
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
