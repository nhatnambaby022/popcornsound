import axios from "axios"
export default function getShowDetails(slug?:string,episode?:string){
    return axios.get(`${process.env.API_URL}/soundtrack?film=${slug}&episode=${episode}`)
}