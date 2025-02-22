import axios from "axios";
import { baseURL} from "../constant/API";
//Create axios client with base url

export interface SearchParam{
    searchFields:string[];
    searchValues:string[];
    sortField:string;
    sortAscending : boolean;
    pageSize:number;
    skip : number;
}
export const client = axios.create({baseURL: baseURL});
export const createSearchQuery = (searchFields:string[],searchValues:string[],sortField:string,sortAscending:boolean,pageSize:number,skip:number) => {
    let searchQuery = "";
    searchFields.forEach(element => {
        searchQuery += "searchFields=" + element + "&"
    });
    searchValues.forEach(element => {
        searchQuery += "searchValues=" + element + "&"
    });
    searchQuery += "sortField=" + sortField + "&"
    searchQuery += "sortAscending=" + sortAscending + "&" 
    searchQuery += "pageSize=" +pageSize + "&"
    searchQuery += "skip=" + skip
    return searchQuery;
}
export const createCountQuery = (searchFields:string[],searchValues:string[],pageSize: number) => {
    let searchQuery = "";
    searchFields.forEach(element => {
        searchQuery += "searchFields=" + element + "&"
    });
    searchValues.forEach(element => {
        searchQuery += "searchValues=" + element + "&"
    });
    searchQuery += "pageSize=" + pageSize
    return searchQuery;
}