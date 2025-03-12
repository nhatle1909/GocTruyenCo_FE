import { Box, IconButton, FormHelperText, Paper } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRef } from 'react';

interface ComicImageUploadProps {
  themeImage: File | null;
  error?: string;
  onImageChange: (file: File) => void;
  style: any;
}

export const ComicImageUpload = ({ themeImage, error, onImageChange, style }: ComicImageUploadProps) => {
  const fileOpenRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <Paper sx={style.comicImage}>
      <Box 
        component="img" 
        sx={style.image} 
        src={themeImage ? URL.createObjectURL(themeImage) : ""} 
      />
      <IconButton
        sx={{ border: '1px solid #1976d2', margin: 1 }}
        onClick={() => fileOpenRef.current?.click()}
      >
        <AddPhotoAlternateIcon sx={{ width: 30, height: 30 }} color="primary" />
      </IconButton>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileOpenRef}
        onChange={handleImageChange}
        accept="image/*"
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Paper>
  );
};