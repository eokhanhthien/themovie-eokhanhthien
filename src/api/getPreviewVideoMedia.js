import axios from "axios";


const getPreviewVideoMedia = {
    getPreviewVideoMedia(params) {
        const { category,contentId,episodeId,definition } = params;

        const axiogetPreviewVideoMedia = axios.create({
            headers: {
                "lang": "en",
                "versioncode" :"11",
                "clienttype" : "ios_jike_default",
                "Content-Type":"application/json"
            },
        });
        return axiogetPreviewVideoMedia.post("https://ga-mobile-api.loklok.tv/cms/app/media/bathGetplayInfo",[{ 
                "category": category,
                "contentId": contentId,
                "episodeId": episodeId,
                "definition": definition       
        }]);
    },
}


export default getPreviewVideoMedia;