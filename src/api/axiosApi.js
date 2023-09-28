import axios from "axios"

const axiosApi = axios.create({
    baseURL: 'https://api.calendly.com',
    headers: {
        Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjk1NjQ2NTc3LCJqdGkiOiI0ZTFiZjdiNS1lNzk0LTRmYjMtYjY5ZS00YzZjNDY1NTg5NGQiLCJ1c2VyX3V1aWQiOiJiM2Q2ZTVlYi0zOGIwLTQ0ZWEtODk3My0xOWFlNTgxMDQyZTYifQ.9CqxkP4G1aiTLz8IPcgbWa2PHuh9vw366LEnFicdsoQ_IYK-BoTcSshXEClwgSzgXXDDrQZtILLVtmzUinHUaw'
    }
})

export default axiosApi