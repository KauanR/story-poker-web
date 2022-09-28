import React from 'react'
import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import theme from '../constants/theme'
import Header from '../components/common/Header'
import Background from '../components/common/Background'
import GlobalContext from '../context'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Story Poker</title>
            </Head>
            <ThemeProvider theme={theme}>
                <GlobalContext>
                    <Header/>

                    <main>
                        <Component {...pageProps}/>
                    </main>

                    <Background/>

                    <CssBaseline />
                </GlobalContext>
            </ThemeProvider>
        </>
    )
}