import * as React from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReactNode } from 'react';
import style from './layout.module.scss';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import FlagIcon from '@mui/icons-material/Flag';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Link from "next/link";
import searchFilm from '@/api/searchFilm';
import { Tag } from '@/pages/index';
import { useRouter } from 'next/router';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SettingsIcon from '@mui/icons-material/Settings';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

interface myprops {
  child : ReactNode,
  currentRoute: String
}



export default function LayOutDefault(props: myprops) {
  const router = useRouter()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const initFilm:Tag[] = []
  const [Films,setFilms] = React.useState(initFilm)
  const [key,setKey] = React.useState("")
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goToFilm = (e:React.SyntheticEvent<Element>,value:string) =>{
    const filmSelect:Tag[] = Films.filter((el:Tag) => el.name == value)
    router.push(`/sound/${filmSelect[0].slug}`)
  }

  const searchFilmHandle = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const key = e.target.value
    setKey(key)
    if (!key) return;
    const response = await searchFilm(key);
    if (response.status == 200){
      setFilms(response.data)
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fixed" open={open}>
          <Toolbar style={{
            display:"flex",
            justifyContent:"space-between",
            backgroundColor:style.BGColorBody,
            height:"100px"
          }}>
            <div style={{
              display:"flex",
              width:"50%",
              minWidth:"88px"
            }} className={style.leftContent}>
              <Link href="/">
                <IconButton>
                  <img className={style.iconLogo} style={{height:"24px", margin:"5px 20px 0px 0px"}} src="/logotext.svg"/>
                </IconButton>
              </Link>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                className={style.menuIcon}
              >
                <MenuIcon />
              </IconButton>
              <Stack  sx={{ width: "100%", borderRadius:"30px",maxWidth:350 }}>
                <Autocomplete 
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={Films.map((option) => option.name)}
                  
                  onChange={goToFilm}
                  renderInput={(params) => (
                    <TextField
                      onChange={searchFilmHandle}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        placeholder:"Search name movie, artist...",
                        style:{
                          borderRadius:"25px",
                          height:"50px",
                          display:"flex",
                          alignContent:"center",
                          marginLeft:"px"
                        },
                        startAdornment: <img src='/find.svg' style={{marginLeft:"6px"}}/>
                      }}
                    />
                  )}
                />
              </Stack>
            </div>
            <div>
              <span className={style.listItem}>
                <Link href="/">
                  <Button style={{textTransform:"capitalize"}}>
                        <h3 style={{color: props.currentRoute == "Home" ? style.textSelectedColor : style.textColor}}>Home</h3>
                  </Button>
                </Link>
                <Link href="/movies">
                  <Button style={{textTransform:"capitalize"}}>
                        <h3 style={{color: props.currentRoute == "Movies" ? style.textSelectedColor : style.textColor}}>Movies</h3>
                  </Button>
                </Link>
                <Link href="/shows">
                  <Button style={{textTransform:"capitalize"}}>
                        <h3 style={{color: props.currentRoute == "Shows" ? style.textSelectedColor : style.textColor}}>Shows</h3>
                  </Button>
                </Link>
                <span style={{
                  minHeight:"100px",
                  padding:"8px 0.5px 8px 0.5px",
                  backgroundColor:"white",
                  marginLeft:"10px"
                }}
                >
                </span>
              </span>
              <Button style={{borderRadius:"50%"}}>
                <img src='/setting.svg' style={{marginLeft:"6px"}}/>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:style.BGColor,
            color:style.textColor
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader theme={darkTheme} style={{
          display:"flex",
          justifyContent:"space-between",
          margin:"16px 0px 0px 10px"
        }}>
          <img style={{height:"24px"}} src={open ? "/logotext.svg" : ""}/>
          <IconButton onClick={handleDrawerClose} style={{color:style.textColor}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List >
          <Link href={"/"}>
            <ListItem disablePadding className={props.currentRoute == "Home" ? style.selected : ""}>
              <ListItemButton style={{
                color: props.currentRoute == "Home" ? style.textSelectedColor : style.textColor
              }}>
                <ListItemIcon>
                  <HomeOutlinedIcon style={{color: props.currentRoute == "Home" ? style.textSelectedColor : style.textColor}}/>
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
          </Link>
          
          <Link href="/movies">
            <ListItem disablePadding className={props.currentRoute == "Movies" ? style.selected : ""}>
              <ListItemButton style={{
                color: props.currentRoute == "Movies" ? style.textSelectedColor : style.textColor
              }}>
                <ListItemIcon>
                  <MovieFilterIcon style={{
                    color: props.currentRoute == "Movies" ? style.textSelectedColor : style.textColor
                  }}/>
                </ListItemIcon>
                <ListItemText primary={'Movies'} />
              </ListItemButton>
            </ListItem>
          </Link>
          
          <Link href="/shows">
            <ListItem disablePadding className={props.currentRoute == "Shows" ? style.selected : ""}>
              <ListItemButton style={{
                color: props.currentRoute == "Shows" ? style.textSelectedColor : style.textColor
              }}>
                <ListItemIcon>
                  <LiveTvIcon style={{
                    color: props.currentRoute == "Shows" ? style.textSelectedColor : style.textColor
                  }}/>
                </ListItemIcon>
                <ListItemText primary={'Shows'} />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding className={props.currentRoute == "Settings" ? style.selected : ""}>
            <ListItemButton style={{
              color: props.currentRoute == "Settings" ? style.textSelectedColor : style.textColor
            }}>
              <ListItemIcon>
                <SettingsIcon style={{
                  color: props.currentRoute == "Settings" ? style.textSelectedColor : style.textColor
                }}/>
              </ListItemIcon>
              <ListItemText primary={'Settings'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open} style={{
        backgroundColor: style.BGColorBody,
      }}>
        <DrawerHeader style={{height:"80px"}}/>
        {props.child}
      </Main>
    </Box>
  );
}