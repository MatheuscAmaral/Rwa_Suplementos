import axios from "axios";

const url = window.location.hostname;

export const api = axios.create({
    baseURL: url == "localhost" ? "http://localhost:3333/" : "https://rwa-api-2-0.vercel.app/"
})
