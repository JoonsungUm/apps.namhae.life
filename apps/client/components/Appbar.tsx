import React from 'react'
import { NextPage } from 'next'

import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'
import { DRAWER_WIDTH } from '../common/const'

interface AppbarProps {
  title: string
  handleDrawerToggle: () => void
}

const Appbar: NextPage<AppbarProps> = ({ title, handleDrawerToggle }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          msScrollLimitYMin: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar sx={{ width: '100%' }}>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              right: 24,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Appbar
