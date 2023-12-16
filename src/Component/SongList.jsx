import React, {useEffect} from "react";
import {Table} from '@mui/joy'
import MusicRowCard from "./Cards/MusicRowCard";
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {leftOverMusics} from "../redux-toolkit/selectors";
import {fetchMusicThunkAction} from "../slices/musicsSlice";


function SongList() {
  const remainMusicList = useSelector(leftOverMusics)
  const dispatch = useDispatch()
  useEffect(() => {
    async function getMusicList(){
      dispatch(fetchMusicThunkAction())
    }
    getMusicList()
  }, []);
  return (
      <Box>
        <Table hoverRow>
          <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Song</th>
            <th>Artist</th>
            <th>Musician</th>
            <th>Album</th>
            <th>btn</th>
          </tr>
          </thead>
          <tbody>
          {
            remainMusicList.map(song => (
                <MusicRowCard key={song.id} song={song}/>
            ))
          }
          </tbody>
        </Table>
      </Box>
  )
}

export default SongList