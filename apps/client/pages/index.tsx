import React, { Fragment } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'


const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Namhae Life App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 4 }}>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  )
}

export default Home
