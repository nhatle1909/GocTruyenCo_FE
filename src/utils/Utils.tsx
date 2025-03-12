//Use this to clean cateogry array after finish ( before call api )
export const cleanStringArray = (array: string[]) => {
    // clean empty , null , "",etc.. elements in string array 

    return array.filter((str) => {
        return str !== null && str !== undefined && str !== "";
      });
}
// Use this to convert cleaned category array to string for search query api
export const stringArrayToString = (array: string[]) => {
    let string = array.join(', ');
    if (string.startsWith(',')) string = string.substring(1);
    return string.toString();
}