import axios from "axios";

const postSearchwithKeyWord = {
    postSearchwithKeyWord(params) {
        const { searchKeyWord } = params;
        const axioGetMedia = axios.create({
            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
                "Content-Type" : "application/json"
            },
        });
        return axioGetMedia.post(`https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord`,{
            "searchKeyWord": `${searchKeyWord}`,
            "size": 50,
            "sort": "",
            "searchType": ""
        });
    },
}

// FIX CORS {mode:'cors',withCredentials: false,} : postSearchwithKeyWord ... trong package thêm "proxy" và cài thêm     "cors": "^2.8.5" + "http-proxy-middleware": "^2.0.4",
    
export default postSearchwithKeyWord;