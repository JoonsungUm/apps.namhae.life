import React from 'react'
import { NextPage } from 'next'

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'


interface AppbarProps {
  title: string
}

export const Appbar: NextPage<AppbarProps> = ({ title }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
