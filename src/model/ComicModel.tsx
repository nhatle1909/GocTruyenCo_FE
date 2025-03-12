import { useEffect, useState } from "react";
import { client} from "../utils/BaseAPI";
import { UploadComicThemeAPI } from "../utils/CloudinaryAPI";
import { createCountQuery, createSearchQuery } from "../utils/SearchQuery";
export interface ComicModel{
    id : string,
    uploaderName:string,
    name : string,
    description : string,
    themeURL : string,
    categoryName:string[],
    chapters:number,
    status:string,
    createdDate:string
}

//------------------------------------------Function-------------------------------------------
export const GetComicById = async (id:string,token:string) => {
    const [comic,setComic] = useState<ComicModel>();
    useEffect(() => {
       const fetchComicById = async () => {
            const response = await GetComicByIdAPI(id,token);
            await setComic(response);
        }
        fetchComicById();
    },[id])
    return comic
}
export const CreateNewComic =  async (uploaderId:string,name:string,description:string,categoryId:string[],imageFile:any,token:string) => {
    try{
        const imageUrl = await UploadComicThemeAPI(name,imageFile);
        const response = await CreateNewComicAPI(uploaderId,name,description,imageUrl,categoryId,token);
        return response;
    }
    catch (error) {
        console.error('Error Creating New Comic:', error);
        return 'Error Creating New Comic';
    }
}
//----------------------------------------------------------------API----------------------------------------------------------------
export const GetComicByIdAPI = async (id:string,token:string) => {
    try{
        const response = await client.get('Comic/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status == 200)
            return response.data.result;
    }
    catch (error) {
        console.error('Error Calling Comic:', error);
        return false;
    }
}
export const GetComicPagingAPI = async (searchFields:string[],searchValues:string[],sortField:string,sortAsc:boolean,pageSize:number,skip:number, token: string) => {
    try {
        let searchQuery = createSearchQuery(searchFields,searchValues,sortField,sortAsc,pageSize,skip);
        const response = await client.get('Comic?' + searchQuery, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        if (response.status == 200)
            return response.data.result;
    } catch (error) {
        console.error('Error Calling Comic:', error);
        return false;
    }
}
export const CountPageComicAPI = async (searchFields:string[],searchValues:string[],pageSize:number,token:string) => {
    try{
        let searchQuery = createCountQuery(searchFields,searchValues,pageSize);
        const response = await client.get('Comic/Count?' + searchQuery, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status == 200)
            return response.data.result;
    }catch (err) {
        console.error('Error Counting Comic:', err);
        return false;
    }
}
export const CreateNewComicAPI = async (uploaderId:string,name:string,description:string,themeURL:string,categoryId:string[],token:string) => {
    const formData = {
        uploaderId: uploaderId,
        name: name,
        description: description,
        themeURL: themeURL,
        categoryId: categoryId,
        chapters: 0,
        status: 'InProgress',
    }
    try {
        const response = await client.post('Comic', formData,
          {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            
        });
        if (response.status == 200)
            return response.data.message;
    } catch (error) {
        console.error('Error Creating New Comic:', error);
        return false;
    }
}