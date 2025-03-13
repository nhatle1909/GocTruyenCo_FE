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