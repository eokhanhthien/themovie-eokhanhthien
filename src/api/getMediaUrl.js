import axios from "axios";

const getMediaUrl = {
    getMediaUrl(params) {
        const { category, id , episodeId,definition } = params;
        const axioGetMedia = axios.create({
            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
            },
        });
        return axioGetMedia.get(`https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${id}&episodeId=${episodeId}&definition=${definition}`, {mode: 'no-cors',withCredentials: false});
    },
}

// FIX CORS {mode:'cors',withCredentials: false,} : getMediaUrl ... trong package thêm "proxy" và cài thêm     "cors": "^2.8.5" + "http-proxy-middleware": "^2.0.4",
    
export default getMediaUrl;