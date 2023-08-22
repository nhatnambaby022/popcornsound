import { Tag } from '@/pages/index';
import { Button } from '@mui/material';
import { display } from '@mui/system/Box';
import * as React from 'react';
import style from "./BoxContainerFilm.module.scss"





const MyFilm:React.FC<{tag:Tag, isFirst:boolean}> = ({tag,isFirst}) =>{
  const  [isHover,serIsHover] = React.useState(false)
  const onMouseEnter = () =>{
    serIsHover(true)
  }
  const onMouseLeave = () =>{
    serIsHover(false)
  }
  return (<>
    <div style={{
      position:"relative",
    }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={`/tmp/${tag.image}`}
        style={{
          height: 300,
          width: 200,
          objectFit:"cover",
          marginLeft:isFirst ? "" : "10px"
        }}
      />
      <div style={{
        height:300,
        width:200,
        top:0,
        left: isFirst ? 0 : 10,
        backgroundImage:`url(/tmp/${tag.image})`,
        display: isHover ? "block" : "none"
      }} className={style.tagbg} >
      </div>
      <div style={{
        height:300,
        width:200,
        top:0,
        left: isFirst ? 0 : 10,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: isHover ? "block" : "none"
      }} className={style.tagbg} >
      </div>
      <div style={{
        width:165,
        textOverflow:"ellipsis",
        position:"absolute",
        top:17,
        left: isFirst ? "15px" : "20px",
        display: isHover ? "block" : "none",
      }}> 
        <div style={{
          fontSize:"16px",
          fontWeight:"bold",
        }}>
          {tag.title}
        </div>
        <div style={{
          fontSize:"12px",
          paddingTop:"10px"
        }}>
          {tag.details}
        </div>
        <div style={{
          fontSize:"12px",
          paddingTop:"10px"
        }}>
          {tag.description}
        </div>
      </div>

      <button style={{
          borderRadius:"50%",
          backgroundColor:"rgba(255,255,255,0.2)",
          width:"44px",
          height:"43px",
          border:"0px",
          cursor:"pointer",
          position:"absolute",
          bottom:"15px",
          left: isFirst ? "20px" : "25px",
          display: isHover ? "block" : "none",
        }} className={style.btnPlay}>
          <img src='/playButton.png'style={{
            width:"44px",
            height:"44px",
            borderRadius:"50%",
          }}/>
        </button>
    </div>
  </>)
}

const MySound:React.FC<{tag:Tag, isFirst:boolean}> = ({tag,isFirst}) =>{
  return (<>
    <div style={{
      width:165,
      marginLeft:isFirst ? "" : "10px",
      cursor:"pointer"
    }}>
      <img
        src={`/tmp/${tag.image}`}
        style={{
          height: 165,
          width: 165,
          objectFit:"cover"
        }}
      />

      <h4 style={{
        fontSize:"16px",
        fontWeight:"bold",
        width:165,
        textOverflow:"ellipsis"
      }}>{tag.title}</h4>

      <span style={{
        fontSize:"14px",
        fontWeight:"100",
        width:165,
        textOverflow:"ellipsis"
      }}>{tag.author}</span>
    </div>
  </>)
}


export interface listImage {
  list:Tag[],
  isFilm: boolean
}
const ImageSlider: React.FC<listImage> = ({list,isFilm}) => {
  
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 300; 
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 300; 
    }
  };
  
  return ( 
    <div className={style["image-slider"]}>
      <button className={style["prev-button"]} onClick={scrollLeft}>
          &#10094;
          </button>
      <div className={style["slider-images"]} ref={scrollContainer}>
          
        {list.map((item, index) => (
          isFilm 
          ? <MyFilm tag={item} isFirst={index == 0}/>
          : <MySound tag={item} isFirst={index == 0}/>
        ))}     
      </div>
      <button className={style["next-button"]} onClick={scrollRight}>
          &#10095;
      </button>
    </div>
  );
};

export interface IAppProps {
  isFilm:boolean,
  list:Tag[]
}
export default function BoxContainer (props: IAppProps) {
    const ListFile = props.list
    return (
    <div style={{
        width:"calc(100vw - 48px)",
        marginTop:"24px",
        color:style.textColor,
        maxWidth:"1260px"
    }}>
        <span>Hot {props.isFilm ? "movies" : "song"}</span>
        <ImageSlider  list={ListFile} isFilm={props.isFilm}/>
    </div>
  );
}