import axios from "axios";

export const api = axios.create({
    baseURL: "http://rwasuplementos.com:80/"
})
