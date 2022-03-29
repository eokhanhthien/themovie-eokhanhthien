import axiosClient from "./axiosClient";

const getHome = {
    getAll(url, params) {
        return axiosClient.get(url, { params },{mode:'cors'});
    },
}

// FIX CORS {mode:'cors',withCredentials: false,} : getHome ... trong package thêm "proxy" và cài thêm     "cors": "^2.8.5" + "http-proxy-middleware": "^2.0.4",
    

export default getHome;