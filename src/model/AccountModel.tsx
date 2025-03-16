import { client} from "../utils/BaseAPI";
import { createCountQuery, createSearchQuery } from "../utils/SearchQuery";

export interface AccountModel {
    id : string,
    username:string,
    email:string,
    createdDate:string,
    isRestricted:boolean
}

export const GetAccountPaging = async (searchFields:string[],searchValues:string[],sortField:string,sortAsc:boolean,pageSize:number,skip:number) => {
    try {
        let searchQuery = createSearchQuery(searchFields,searchValues,sortField,sortAsc,pageSize,skip);
        const response = await client.get('Account?' + searchQuery);
        if (response.status == 200)
            return response.data.result;
    } catch (error) {
        console.error('Error Calling Account:', error);
        return false;
    }
}
export const CountPageAccountAsync = async (searchFields:string[],searchValues:string[],pageSize:number) => {
    try{
        let searchQuery = createCountQuery(searchFields,searchValues,pageSize);
        const response = await client.get('Account/Count?' + searchQuery);
        if (response.status == 200)
            return response.data.result;
    }catch (err) {
        console.error('Error Counting Account:', err);
        return false;
    }
}
export const RestrictAccount = async (accountId:string) => {
    try {
    
        const response = await client.delete('Account/' + accountId);
        if (response.status == 200)
            return response.data.message;
    }
    catch (error) {
        console.error('Error Restrict Account:', error);
        return false;
    }
}
export const UpdateAccount = async (accountId:string) => {
    try {
        const response = await client.put('Role/' + accountId);
        if (response.status == 200)
            return response.data.result;
    }
    catch (error) {
        console.error('Error Restrict Account:', error);
        return false;
    }
}