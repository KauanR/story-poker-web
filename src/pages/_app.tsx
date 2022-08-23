import React from 'react'
import '../styles/main.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main>
            <Component {...pageProps}/>
        </main>
    )
}