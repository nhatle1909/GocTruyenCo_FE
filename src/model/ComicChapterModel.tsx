import { client } from '../utils/BaseAPI';
import {  createSearchQuery } from './../utils/SearchQuery';

export interface ComicChapterModel {

    id : string
    name : string
    comicId:string
    createdDate : string
}
//------------------------------------------Function-------------------------------------------

//------------------------------------------API------------------------------------------------
export const GetComicChapterPagingAPI = async (comicId:string,pageSize:number,skip:number, token: string) => {
    try {
        const SearchQuery = await createSearchQuery(["ComicId"],[comicId],"CreatedDate",true,pageSize,skip);
        console.log(SearchQuery);
        const response = await client.get('ComicChapter?' + SearchQuery, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status == 200)
            return response.data.result;
    }
    catch (error) {
        console.error('Error Calling ComicChapter:', error);
        return false;
    }

}