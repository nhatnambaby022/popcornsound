import Head from 'next/head'
import LayOutDefault from '@/components/LayOut/LayOutDefault'
import BoxContainer from '@/components/boxContainer/BoxContainer'
import BoxList from '@/components/boxList/BoxList'
import { CircularProgress } from '@mui/material'
import getListFilm from '@/api/getListFilm'
import * as React from 'react';
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
  const [listFilmPopular, setListFilmPopular] = React.useState([]); 

    const fetchDataFilm = async ()=>{
      const response = await getListFilm();
      if (response.status == 200) {
        setListFilm(response.data.data)
        setIsLoading(false)
      }
      
    }
    const fetchDataFilmPopular = async ()=>{
      const response = await getFilmPopular();
      if (response.status == 200) {
        setListFilmPopular(response.data)
        setIsLoading(false)
      }
      
    }

    React.useEffect(()=>{
      fetchDataFilm()
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
      <BoxList ListItems={listFilm} title="List shows" type="shows"/>
      <BoxContainer isFilm={true} title="Hot movies" list={listFilmPopular} />
    </div>
  )
}

export default function Shows() {
  return (
    <div>
      <Head>
        <title>Soundtrack form Movies & TVShows | Popcornsound</title>
        <meta name="description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:description" content="Discover the perfect soundtrack for every moment at Popcorn Sound – your ultimate destination for cinematic and immersive audio experiences. Explore a vast collection of handpicked soundtracks that elevate your emotions, whether you're watching a movie, playing a game, or simply enjoying life's moments. From epic orchestral scores to soulful melodies, find the right sound to complement your journey. Dive into the world of soundtracks with Popcorn Sound today." />
        <meta property="og:image" content="https://popcornsound.com/cover_popcorn_sound.png" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:creator" content="@PopcornSound" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://popcornsound.com" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <LayOutDefault child={<Container />} currentRoute="Shows"/>
    </div>
  )
}
