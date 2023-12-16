import React from "react";
import {Grid, Stack, Typography} from "@mui/material";
import HomeMusicCard from "./Cards/HomeMusicCard";
import {useSelector} from "react-redux";
import musicsSlice from "../slices/musicsSlice";

function TrackList({songs}) {
  return (
      <Stack
          direction={{sm: 'column', md: 'row'}}
          paddingY="1rem"
          spacing={2}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h5" sx={{fontWeight: "bold"}}>Tracks For You</Typography>
          <Stack direction="column">
            <Grid container direction="row" spacing={1}>
              {songs.map((data) => (
                  <Grid item xs={12} md={6}>
                    <HomeMusicCard song={data}></HomeMusicCard>
                  </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
  )
}

export default TrackList