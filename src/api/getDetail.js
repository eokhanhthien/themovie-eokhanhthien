
import axios from "axios";



const getDetail = {
    getDetail(params) {
        const { id, category } = params;
        const axioGetDetail = axios.create({

            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
            },
        });
        return axioGetDetail.get(`https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`, {mode: 'no-cors'});
    },
}


export default getDetail;