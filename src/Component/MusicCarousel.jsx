import React from "react";
import {Autoplay, EffectFlip, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Box, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {mediaSlice} from "../slices/mediaSlice";
import musicsSlice from "../slices/musicsSlice";

function MusicCarousel({style}) {
  const songDetail = useSelector((state) => state.musicListReducer.musics)
  const dispatch = useDispatch()
  return (
      <Stack sx={{height: "30%"}}>
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            grabCursor={true}
            pagination={{clickable: true}}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[EffectFlip, Pagination, Autoplay,]}
            className="mySwiper"
            style={style}
        >
          {songDetail.map((data) => (
              <SwiperSlide>
                <Stack position="row" role="button">
                  <img style={{objectFit: "fill", float: "left", objectPosition: "100% 10%", opacity: 0.3}}
                       className={"bg-blur"} src={data.thumbnail}/>
                  <img style={{
                    width: "47%",
                    float: "left",
                    objectPosition: "100% 1000%",
                    position: "absolute",
                    top: "0%",
                    left: "55%",
                    zIndex: "1000"
                  }} src={data.thumbnail}/>
                </Stack>
                <Typography
                    role="button"
                    variant="h5" sx={{
                  position: "absolute",
                  textAlign: "center",
                  top: "50%",
                  left: "5%",
                  fontWeight: "bold",
                  zIndex: "2000"
                }}>{data.songName}</Typography>
              </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
  )
}

export default MusicCarousel;