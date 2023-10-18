import axios from "axios"
export default function getSoundTracks(slug?:string, episode?:string){
    return axios.get(`${process.env.API_URL}/soundtrack?film=${slug}&episode=${episode}`)
}