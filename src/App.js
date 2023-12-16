import './App.css';
import SideBar from "./Component/SideBar";
import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import Admin from "./Component/Layout/Admin";
import Home from "./Component/Layout/Home";
import Songs from "./Component/Layout/Songs";
import BottomMusicPlayer from "./Component/BottomMusicPlayer";
import React from "react";
const materialTheme = materialExtendTheme();
function App() {
  return (
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
        <CssBaseline enableColorScheme/>
        <div className="App" >
            <SideBar>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/songs' element={<Songs/>}/>
              <Route path='/albums'/>
              <Route path='/artists'/>
              <Route path='/liked'/>
              <Route path='/playlists'/>
              <Route path='/admin' element={<Admin/>}/>
            </Routes>
            </SideBar>
        </div>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
  );
}

export default App;
