import { useEffect, useState } from "react";
import { client } from "../utils/BaseAPI";

export interface ComicCategoryModel {
    id : string
    name : string
}


//----------------------------------------------------------------Functions-----------------------------------------------------------
export const  GetAllComicCategories = () => {
    const [categories, setCategories] = useState<ComicCategoryModel[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await GetAllComicCategoriesAPI();
            await setCategories(fetchedCategories);

        };
        fetchCategories();
    }, []);
    return categories;
}
export const ConvertNameToCategoryId = (categories: ComicCategoryModel[], categoryName:string[]) =>{
    const categoriesName = categories.map(c => c.name)
    const categoriesId = categories.map(c => c.id);
    let categoryId = [""];
    for(let i = 0; i < categoryName.length; i++){
        const index = categoriesName.indexOf(categoryName[i]);
        categoryId.push(categoriesId[index]);
    }
    return categoryId.slice(1);
}
//--------------------------------------------------------------- API ----------------------------------------------------------------
export const GetAllComicCategoriesAPI = async () =>{
    try {
        const response = await client.get('ComicCategory?isHentai=true');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching comic categories:', error);
        return [];
    }
 
}
