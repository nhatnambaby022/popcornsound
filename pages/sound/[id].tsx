import Head from 'next/head'
import LayOutDefault from '@/components/LayOut/LayOutDefault'
import { CircularProgress } from '@mui/material'
import * as React from 'react';
import { useRouter } from 'next/router';
import ListSound from '@/components/listSound/ListSound';
import getFilmById from '@/api/getFilmById';
import {Helmet} from "react-helmet";
export interface Tag{
  id:string,
  name:string,
  thumbnail:string,
  slug?:string,
  soundtrack_count: number,
  author?:string
}
function Container(){
    const playList = {"id": "167",
    "slug": "every-body",
    "name": "Every Body",
    "thumbnail": "https://img-www.tf-cdn.com/movie/2/every-body-2023.jpeg?_v=638236800000000000&auto=compress&fm=pjpg&fit=crop&crop=faces%2Centropy%20312&dpr=2&w=1920&h=760",
    "backdrop": "https://img-www.tf-cdn.com/movie/2/every-body-2023.jpeg?_v=638236800000000000&auto=compress&fm=pjpg&fit=crop&crop=faces%2Centropy%20312&dpr=2&w=1920&h=760",
    "type": 2,
    "release_date": null,
    "path": "/movie/every-body-2023",
    "isBanner": 1,
    "isRecent": 1,
    "isNew": 0,
    "isPopular": 0,
    "soundtrack_count": 16}
    const router = useRouter()

    const initTag: Tag = {
      id:"",
      name:"",
      thumbnail:"",
      soundtrack_count:0
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const [filmDetails, setFilmDetails] = React.useState(initTag)
    const fetchData = async ()=>{
        const {id} = router.query
        if (!id) return
        const response = await getFilmById(id?.toString());
        if (response.status == 200) {
            setFilmDetails(response.data) 
            setIsLoading(false)
        }
        
    }

    React.useEffect(()=>{
        fetchData()
    },[router.query.id])

    if (isLoading) {
        return (
        <CircularProgress />
        )
    }

  if (filmDetails) return (
    <div>
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
            <ListSound playlist={filmDetails}/>
        </div>
    </div>
  )
  else {
    return(
      <h1 style={{color:"white"}}>Not Found</h1>
    )
  }
}

export default function Sound() {
  return (
    <div>
      <Head>
        <title>Popcorn Sound</title>
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
