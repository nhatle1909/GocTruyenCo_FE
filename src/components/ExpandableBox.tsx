import { Box, Button, Grid2, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material"
import { ThreeStateCheckbox } from "./Checkbox"
import { ExpandCircleDown, ExpandLess, ExpandMore, Grid4x4 } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { ComicCategoryModel, GetAllComicCategories } from './../model/ComicCategoryModel';


interface ExpandableBoxProps {

    onClick: (oldValue:string,newValue: string) => void;
}
export const ExpandableCategoryList: React.FC<ExpandableBoxProps> = ({  onClick }) => {
    const categories = GetAllComicCategories();
    
    const [isExpand, setIsExpand] = useState(false);
    const itemsPerRow = 6;
    const visibleItems = isExpand ? categories : categories.slice(0, itemsPerRow);
    const rows = [];

    for (let i = 0; i < visibleItems.length; i += itemsPerRow) {
        rows.push(visibleItems.slice(i, i + itemsPerRow));
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <List>
                {rows.map((row, rowIndex) => (
                    <ListItem key={rowIndex} disablePadding>
                        <Grid2 sx={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }} container spacing={1}>
                            {row.map((item, colIndex) =>(
                                    <Grid2 size={2} key={colIndex} alignSelf={'flex-start'} >
                                        <ThreeStateCheckbox  key={rowIndex*itemsPerRow + colIndex} id={item.id} name={item.name} onClick={(oldValue,newValue) => onClick(oldValue,newValue)} />
                                        <Typography></Typography>
                                    </Grid2>
                                ))}
                        </Grid2>
                    </ListItem>
                ))}
            </List>
            <IconButton onClick={() => setIsExpand(!isExpand)} sx={{ alignSelf: 'flex-end' }}>
                {isExpand ? (<ExpandLess sx={{ color: "black", width: 25, height: 25 }} />) : (<ExpandMore sx={{ color: "black", width: 25, height: 25 }} />)}
            </IconButton>
        </Box>
    )
}