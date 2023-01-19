import Axios from '/axios_settings';

export class VideoController {
    static async GetVideoCount() {
        return Axios.get(`/getVideoCount`);
    }
    static async AddVideo(model){
        return Axios.post("/AddVideo", model);
    }
    static async GetAllVideos(){
        return Axios.get("/getAllVideos");
    }
    static getBaseUrl(){
        return Axios.defaults.baseURL
    }
}