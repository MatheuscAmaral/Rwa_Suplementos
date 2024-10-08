import axios from "axios";

export const api = axios.create({
    baseURL: "https://rwa-api-2-0.vercel.app"
})
