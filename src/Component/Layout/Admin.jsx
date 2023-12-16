import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import {Divider, Button, FormControl, FormLabel, Input, Stack, FormHelperText} from "@mui/joy";
import thumbnailExample from '../../asset/image/thumbnail-example.jpg'
import FileService from "../services/fileService";
import SongList from "../SongList";
import {useDispatch} from "react-redux";
import filtersSlice from "../../slices/filtersSlice";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import data from "bootstrap/js/src/dom/data";
import {InfoOutlined} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {addNewMusicThunkAction} from "../../slices/musicsSlice";

const schema = yup.object({
    songName: yup.string().required('Song name is a required field'),
    artist: yup.string().required(),
    album: yup.string().required(),
    musician: yup.string().required(),
}).required();

function Admin() {
    const [state, setState] = useState({
        tempThumbnail: "",
        tempAudio: '',
        audioInput: {},
        thumbnailInput: {},
        audioUrl: null,
        thumbnailUrl: null,
        audio: '',
        image: '',
        mediaUploadAvailable: true,
        mediaUploading:false
    })
    const [uploadMedia, setUploadMedia] = useState(true)
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const {
        tempThumbnail, thumbnail,
        audio, tempAudio, audioUrl,
        thumbnailUrl, audioInput, thumbnailInput, mediaUploadAvailable, mediaUploading
    } = state
    const handleSelectThumbnail = (e) => {
        const tempThumbnail = URL.createObjectURL(e.target.files[0])
        setState({
            ...state,
            tempThumbnail: tempThumbnail,
            thumbnailInput: e.target.files[0]
        })
    }
    useEffect(() => {
        if(tempThumbnail && tempAudio){
            setUploadMedia(false)
        }
    }, [thumbnailInput, audioInput]);
    const handleSelectAudio = (e) => {
        const tempAudio = URL.createObjectURL(e.target.files[0])
        setState({
            ...state,
            tempAudio: tempAudio,
            audioInput: e.target.files[0]
        })
    }
    const dispatch = useDispatch()
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleUploadMedia = async () => {
        let uploadImage = await FileService.uploadImage(thumbnailInput)
        let uploadAudio = await FileService.uploadAudio(audioInput);
        if (uploadAudio && uploadImage){
            setState({
                ...state,
                audioUrl: String(uploadAudio.data.secure_url),
                thumbnailUrl: String(uploadImage.data.secure_url),
                tempAudio: '',
                audioInput: {},
                thumbnailInput: {},
                tempThumbnail: '',
                mediaUploadAvailable: false
            })
        }

    }
    const handleAddNewMusic = (data) => {
        if (audioUrl && thumbnailUrl) {
            setState({
                ...state,
                tempAudio: '',
                audioInput: {},
                thumbnailInput: {},
                tempThumbnail: '',
                mediaUploading: true
            })
            let newMusic = {
                ...data,
                audio: audioUrl,
                thumbnail: thumbnailUrl
            }
            dispatch(addNewMusicThunkAction(newMusic))
            setState({
                ...state,
                mediaUploading: false
            })
        }
    }
    const handleClearForm = () => {
        reset()
        setState({
            ...state,
            tempAudio: '',
            tempThumbnail: '',
            audioInput: '',
            thumbnailInput: '',
        })
        setUploadMedia(true)
    }

    return (
        <>
            <Divider>
                <Typography variant="h4">Admin Page</Typography>
            </Divider>
            <form onSubmit={handleSubmit(handleAddNewMusic)}>
                <Stack direction={{xs: "column", sm: "row"}} spacing={2} alignItems="stretch" justifyContent="center"
                       sx={{marginY: "1rem"}}>
                    <Stack direction="column" spacing={2} sx={{width: "100%"}}>
                        <FormControl>
                            <FormLabel>Song Name</FormLabel>
                            <Input
                                placeholder="Song Name" {...register('songName')}
                                error={errors?.songName?.message}
                            />
                            <FormHelperText sx={{color: "#EF4040"}}>
                                {errors?.songName?.message && <InfoOutlined sx={{color: "#EF4040"}}/>}
                                {errors?.songName?.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Artist Name</FormLabel>
                            <Input
                                placeholder="Artist Name" {...register('artist')}
                                error={errors?.artist?.message}
                            />
                            <FormHelperText sx={{color: "#EF4040"}}>
                                {errors?.artist?.message && <InfoOutlined sx={{color: "#EF4040"}}/>}
                                {errors?.artist?.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Musician</FormLabel>
                            <Input placeholder="Musician Name" {...register('album')}
                                   error={errors?.album?.message}
                            />
                            <FormHelperText sx={{color: "#EF4040"}}>
                                {errors?.album?.message && <InfoOutlined sx={{color: "#EF4040"}}/>}
                                {errors?.album?.message}
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Album Name</FormLabel>
                            <Input placeholder="Album Name" {...register('musician')}
                                   error={errors?.musician?.message}
                            />
                            <FormHelperText sx={{color: "#EF4040"}}>
                                {errors?.musician?.message && <InfoOutlined sx={{color: "#EF4040"}}/>}
                                {errors?.musician?.message}
                            </FormHelperText>
                        </FormControl>
                    </Stack>
                    <Stack direction="column" spacing={2} sx={{width: "100%"}} justifyContent="space-between">
                        <FormControl>
                            <FormLabel>Thumbnail</FormLabel>
                            <Box>
                                <img role='button' width="100%" height="100%"
                                     style={{borderRadius: "1rem"}}
                                     src={tempThumbnail || thumbnailExample}
                                     onClick={() => document.getElementById('fileImage').click()}/>
                            </Box>
                            <input id="fileImage"
                                   type="file" accept="image/*" className={"d-none"}
                                   {...register('thumbnail')}
                                   onChange={handleSelectThumbnail}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Music</FormLabel>
                            <Stack direction="row" spacing={2}>
                                <Button component="label" variant="contained" fullWidth
                                        sx={{backgroundColor: "#EF4040"}}>
                                    Choose your music
                                    <VisuallyHiddenInput type="file"
                                                         accept="audio/*"
                                                         {...register('audio')}
                                                         onChange={handleSelectAudio}/>
                                </Button>
                                <Button onClick={handleUploadMedia} disabled={uploadMedia} fullWidth>Upload Media</Button>
                            </Stack>
                            <FormHelperText sx={{color: "#EF4040"}}>
                                {errors?.audio?.message && <InfoOutlined sx={{color: "#EF4040"}}/>}
                                {errors?.audio?.message}
                            </FormHelperText>
                        </FormControl>

                    </Stack>
                </Stack>
                <audio src={tempAudio}
                       controls={tempAudio}
                       style={{width: "100%"}}></audio>
                <Stack sx={{marginY: "1rem"}} direction={'row'} spacing={1}>
                    <Button type="submit" onClick={handleAddNewMusic} disabled={mediaUploadAvailable} loading={mediaUploading} fullWidth>Upload</Button>
                    <Button type="button" onClick={handleClearForm} fullWidth>Clear</Button>
                </Stack>
            </form>
            <Divider sx={{margin: "1rem"}}>
                <Typography variant="h6">Music List</Typography>
            </Divider>
            <FormControl sx={{marginY: "1rem"}}>
                <FormLabel>Search Song</FormLabel>
                <Input onInput={(e) => dispatch(filtersSlice.actions.setSearchText(e.target.value))} placeholder="Search Song"/>
            </FormControl>
            <SongList/>
        </>
    )
}
export default Admin

