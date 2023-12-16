import axios from "axios";

const CLOUDINARY_API_UPLOAD_AUDIO ='https://api.cloudinary.com/v1_1/dqi4kar06/video/upload'
const CLOUDINARY_API_UPLOAD_IMAGE ='https://api.cloudinary.com/v1_1/dqi4kar06/image/upload'
class FileService {
  static uploadAudio(audio){
    const formData = new FormData();
    formData.append("file", audio);
    formData.append("upload_preset", "deaetg30")
    return axios.post(CLOUDINARY_API_UPLOAD_AUDIO,formData)
  }
  static uploadImage(image){
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "deaetg30");
    return axios.post(CLOUDINARY_API_UPLOAD_IMAGE,formData)
  }
}

export default FileService;