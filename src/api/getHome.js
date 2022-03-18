import axiosClient from "./axiosClient";
import axios from "axios";



const getHome = {
    getAll(url, params) {
        return axiosClient.get(url, { params },{mode:'cors'});
    },
    getDetail(params) {
        const { id, category } = params;
        const axioGetDetail = axios.create({

            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
            },
        });
        return axioGetDetail.get(`https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`, {mode: 'cors'});
    },

    getMediaUrl(params) {
        const { category, id , episodeId,definition } = params;
        const axioGetMedia = axios.create({
            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
            },
        });
        return axioGetMedia.get(`https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${id}&episodeId=${episodeId}&definition=${definition}`, {mode: 'cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded',},withCredentials: false});
    },
}

// FIX CORS {mode:'cors',withCredentials: false,} : getHome ... trong package thêm "proxy" và cài thêm     "cors": "^2.8.5" + "http-proxy-middleware": "^2.0.4",
    

export default getHome;