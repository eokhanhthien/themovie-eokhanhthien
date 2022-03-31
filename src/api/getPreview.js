import axios from "axios";


const getPreview = {
    getPreview(params) {
        const { page } = params;

        const axiogetPreview = axios.create({
            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
                "deviceid": "",
            },
        });
        return axiogetPreview.get(`https://ga-mobile-api.loklok.tv/cms/app/recommendPool/getVideoFromRecommondPool?page=${page}`);
    },
}


export default getPreview;