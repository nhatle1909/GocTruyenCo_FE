import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CheckBox, DisplaySettings, SetMealSharp } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
interface CheckboxProps {
  id:string;
  name:string;
  onClick : (oldValue:string,newValue:string) => void;
}
export const ThreeStateCheckbox:React.FC<CheckboxProps> = ({id,name,onClick}) => {
  const [checkboxState, setCheckboxState] = useState(0); // 0: No, 1: Maybe, 2: Yes
  const [oldCheckboxState, setOldCheckboxState] = useState(2);
    const handleChange = () => {
    setOldCheckboxState(checkboxState);
    setCheckboxState((prev) => (prev + 1) % 3);
    };

  const getStateString = (state:number) => {
    switch (state) {
      case 0:
        return id;
      case 1:
        return "!" + id;
      case 2:
        return "";
      default:
        return id;
  // Default to 'No' in case of unexpected state
    }
  };


  return (
    <Box sx={style.checkbox}>
      <Checkbox
        value={getStateString(checkboxState)}
        checked={checkboxState === 1}
        indeterminate={checkboxState === 2}
        onChange={(e) =>{
          handleChange();
          onClick(getStateString(oldCheckboxState),e.target.value.toString());
        }}
        icon={<CheckBoxOutlineBlankIcon />}
        checkedIcon={<CheckBoxIcon />}
        indeterminateIcon={<IndeterminateCheckBoxIcon />}
      />
      <Typography>{name}</Typography>
      </Box>
  );
}
const style=({
  checkbox: {
   display:'flex',
   flexDirection:'row',
   alignItems:'center'
   
  },
})