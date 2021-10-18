import React from 'react'
import { NextPage } from 'next'

import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

interface AppbarProps {
  title: string
  drawerWidth: number
  handleDrawerToggle: () => void
}

const Appbar: NextPage<AppbarProps> = ({
  title,
  drawerWidth,
  handleDrawerToggle,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          msScrollLimitYMin: { sm: `${drawerWidth}px` },
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
              display: { sm: 'none' },
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
