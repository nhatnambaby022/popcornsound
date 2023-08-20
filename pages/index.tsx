import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LayOutDefault from '@/components/LayOut/LayOutDefault'
import BoxContainerFilm from '@/components/boxContainerFilm/BoxContainerFilm'

const inter = Inter({ subsets: ['latin'] })

function Container(){
  return (
    <>
      <div style={{
        width:"100%"
      }}>
        <img src='/album.png' style={{
          width:"100%",
          minWidth:"300px"
        }} />
      </div>
      <BoxContainerFilm />
    </>
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <LayOutDefault child={<Container />} currentRoute="Home"/>
    </div>
  )
}
