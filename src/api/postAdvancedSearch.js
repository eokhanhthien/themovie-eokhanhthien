import axios from "axios";

const postAdvancedSearch = {
    postAdvancedSearch(params) {
        const { param,area,category,year } = params;
        const axioGetAllFilm = axios.create({
            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
                "content-type":"application/json"
            },
        });
        return axioGetAllFilm.post("https://ga-mobile-api.loklok.tv/cms/app/search/v1/search",{ 
            "size": 351,
            "params": `${param}`,
            "area": `${area}`,
            "category": `${category}`,
            "year": `${year}`,
            "subtitles": "",
            "order": "up"
    });
    },
    getSearchConfig(params) {
        const { searchKeyWord } = params;
        const axioGetSearchConfig = axios.create({
            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
            },
        });
        return axioGetSearchConfig.get("https://ga-mobile-api.loklok.tv/cms/app/search/list");
    }
}
// postSearchwithKeyWord va postAdvancedSearch la body raw
// FIX CORS {mode:'cors',withCredentials: false,} : postAdvancedSearch ... trong package thêm "proxy" và cài thêm     "cors": "^2.8.5" + "http-proxy-middleware": "^2.0.4",
    
export default postAdvancedSearch;