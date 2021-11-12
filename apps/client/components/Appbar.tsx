import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import MenuIcon from '@mui/icons-material/Menu'

import { DRAWER_WIDTH } from '../common/const'

interface AppbarProps {
  title: string
  handleDrawerToggle: () => void
}

const Appbar: NextPage<AppbarProps> = ({ title, handleDrawerToggle }) => {
  const router = useRouter()

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
          <IconButton
            sx={{ pr: 1 }}
            color="inherit"
            size="small"
            onClick={() => {
              router.back()
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ pl: 1 }}>
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
