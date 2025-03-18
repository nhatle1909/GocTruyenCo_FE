import { client } from "./BaseAPI";

export const UploadComicThemeAPI = async (name:string,imageFile:any) => {
    try{
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        const response = await client.post('Cloudinary/'+ name, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.result;
    }
    catch(error){
        console.error('Error Uploading Comic Theme Image:', error);
        return '';
    }
}
export const UploadComicChapterImageAPI = async (comicName:string,chapterName:string,imageFile:any) => {
    try{
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        const response = await client.post('Cloudinary/'+ comicName + ',' + chapterName, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.result;
    }
    catch(error){
        console.error('Error Uploading Comic Chapter Image:', error);
        return '';
    }
}