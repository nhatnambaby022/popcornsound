import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LayOutDefault from '@/components/LayOut/LayOutDefault'
import BoxContainer from '@/components/boxContainer/BoxContainer'
import BoxList from '@/components/boxList/BoxList'
import { CircularProgress } from '@mui/material'
import getListFilm from '@/api/getListFilm'
import * as React from 'react';
import getFilmNew from '@/api/getFilmNew'
import getFilmPopular from '@/api/getFilmPopular'
export interface Tag{
  id:string,
  name:string,
  thumbnail:string,
  slug?:string,
  soundtrack_count: number,
  author?:string,
  type?:number
}
function Container(){

  const [isLoading, setIsLoading] = React.useState(true);
  const [listFilm, setListFilm] = React.useState([]);
  const [listFilmNew, setListFilmNew] = React.useState([]); 
  const [listFilmPopular, setListFilmPopular] = React.useState([]); 

    const fetchDataFilm = async ()=>{
      const response = await getListFilm();
      if (response.status == 200) {
        setListFilm(response.data.data)
        setIsLoading(false)
      }
      
    }
    const fetchDataFilmNew = async ()=>{
      const response = await getFilmNew();
      if (response.status == 200) {
        setListFilmNew(response.data.data)
        setIsLoading(false)
      }
      
    }
    const fetchDataFilmPopular = async ()=>{
      const response = await getFilmPopular();
      if (response.status == 200) {
        setListFilmPopular(response.data.data)
        setIsLoading(false)
      }
      
    }

    React.useEffect(()=>{
      fetchDataFilm()
      fetchDataFilmNew()
      fetchDataFilmPopular()
    },[])

    if (isLoading) {
      return (
        <CircularProgress />
      )
    }

  return (
    <div style={{
      width:"100%",
      minWidth:"300px",
      display:"flex",
      flexDirection:"column",
      alignContent:"center",
      justifyContent:"center",
      alignItems:"center",
      justifyItems:"center",
    }}>
      <div>
        <img src='/album.png' style={{
          width:"calc(100vw - 48px)",
          minWidth:"300px",
          maxWidth:"1260px"
        }} />
      </div>
      <BoxContainer isFilm={true} title="New movies" list={listFilmNew}/>
      <BoxList ListItems={listFilm} title="List movies" type="movies"/>
      <BoxContainer isFilm={true} title="Popular movies" list={listFilmPopular}/>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Soundtrack form Movies & TVShows | Popcornsound</title>
        <meta name="description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <LayOutDefault child={<Container />} currentRoute="Home"/>
    </div>
  )
}
