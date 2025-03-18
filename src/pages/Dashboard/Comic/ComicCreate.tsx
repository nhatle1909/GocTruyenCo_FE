import { useState, useRef} from "react";
import {
    Box,
    Button,
    IconButton,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery,
    useTheme,
    FormHelperText,
    Snackbar,
    Alert,
} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styles } from "../Style/DashboardStyle";
import { cleanStringArray } from '../../../utils/Utils';
import { ConvertNameToCategoryId, GetAllComicCategories } from "../../../model/ComicCategoryModel";
import { CreateNewComic } from "../../../model/ComicModel";
import { useAuthStore } from "../../../store/authStore";
import { decodeJWT } from "../../../utils/jwtUtils";

interface FormErrors {
    name: string;
    description: string;
    categories: string;
    themeImage: string;
}

export const ComicCreate = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const {token} = useAuthStore.getState();
    const id = decodeJWT(token).nameid;
    const [trigger, setTrigger] = useState({ trigger: false, message: "" });
    const fileOpenRef = useRef<HTMLInputElement>(null);
    const [comicData, setComicData] = useState({
        themeImage: null as File | null,
        name: '',
        description: '',
    });
    
    const [errors, setErrors] = useState<FormErrors>({
            name: '',
            description: '',
        categories: '',
        themeImage: '',
        });

    const [categoryStringArray, setCategoryStringArray] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const categories = GetAllComicCategories();

    const validateForm = (): boolean => {
        let tempErrors = {
            name: '',
            description: '',
            categories: '',
            themeImage: '',
    };
        let isValid = true;

        if (!comicData.name.trim()) {
            tempErrors.name = 'Comic name is required';
            isValid = false;
            }

        if (!comicData.description.trim()) {
            tempErrors.description = 'Description is required';
            isValid = false;
            }

        if (categoryStringArray.length === 0) {
            tempErrors.categories = 'At least one category is required';
            isValid = false;
        }

        if (!comicData.themeImage) {
            tempErrors.themeImage = 'Theme image is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const categoryId = ConvertNameToCategoryId(categories, categoryStringArray);
            await CreateNewComic(id, comicData.name, comicData.description, categoryId, comicData.themeImage);
            setTrigger({ trigger: true, message: 'Comic created successfully!' });
            clearData();
            // You might want to add a success message or redirect here
        } catch (error) {
            console.error('Error creating comic:', error);
            setTrigger({ trigger: true, message: 'Comic created failed!' });
            // Handle error appropriately
        } finally {
            setIsSubmitting(false);
        }
};

    const handleComicDataChange = (field: string, value: any) => {
        setComicData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const clearData = () => {
        setComicData({
            themeImage: null,
            name: '',
            description: '',
        });
        setCategoryStringArray([]);
        setErrors({
            name: '',
            description: '',
            categories: '',
            themeImage: '',
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleComicDataChange('themeImage', e.target.files[0]);
            setErrors(prev => ({ ...prev, themeImage: '' }));
        }
    };

    const handleCategoryChange = (action: 'add' | 'remove', value: string) => {
        setCategoryStringArray(prev => {
            let newCategories;
            if (action === 'add' && !prev.includes(value)) {
                newCategories = [...prev, value];
            } else if (action === 'remove') {
                newCategories = prev.filter(cat => cat !== value);
            } else {
                newCategories = prev;
            }
            
            // Clear category error if categories are selected
            if (newCategories.length > 0) {
                setErrors(prev => ({ ...prev, categories: '' }));
            }
            
            return newCategories;
        });
    };

    return (
        <Box sx={[styles.tablePaper, style.mainContent]} component="form" onSubmit={handleSubmit}>
                       <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={()=>  setTrigger({ trigger: false, message: "" })}
                open={trigger.trigger}
                // message={trigger.message}
            > 
            <Alert
            onClose={()=>  setTrigger({ trigger: false, message: "" })}
            severity="info"
            variant="filled"
            sx={{ width: '100%' }}
          >
           {trigger.message}
          </Alert>
          </Snackbar>
            <Paper sx={style.comicImage}>
                <Box 
                    component="img" 
                    sx={style.image} 
                    src={comicData.themeImage !== null ? URL.createObjectURL(comicData.themeImage) : ""} 
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
                {errors.themeImage && (
                    <FormHelperText error>{errors.themeImage}</FormHelperText>
                )}
            </Paper>

            <Paper variant="outlined" sx={style.comicCreateForm}>
                <TextField
                    label="Comic Name"
                    size="small"
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={[styles.inputField(theme,isMobile), style.textField(theme)]}
                    value={comicData.name}
                    onChange={(e) => handleComicDataChange('name', e.target.value)}
                />
                <TextField
                    label="Comic Description"
                    size="small"
                    multiline
                    required
                    minRows={4}
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description}
                    sx={[styles.inputField(theme,isMobile), style.textField(theme)]}
                    value={comicData.description}
                    onChange={(e) => handleComicDataChange('description', e.target.value)}
                />
                <Box sx={style.categorySelected(theme)}>
                    {cleanStringArray(categoryStringArray).map((category, index) => (
                        <Button
                            key={index}
                            onClick={() => handleCategoryChange('remove', category)}
                            variant="contained"
                            color="secondary"
                            sx={style.categorySelectedItem(theme)}
                        >
                            {category}
                        </Button>
                    ))}
                </Box>
                {errors.categories && (
                    <FormHelperText error>{errors.categories}</FormHelperText>
                )}
                
                <FormControl sx={{ m: 1, width: 300 }} error={!!errors.categories}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={categoryStringArray[0]}
                        label="Category"
                        onChange={(e) => handleCategoryChange('add', e.target.value.toString())}
                    >   
                        {categories.map((category, index) => (
                            <MenuItem key={category.name || index} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                        type="button"
                        onClick={clearData}
                        variant="contained"
                        size="small"
                        sx={{ margin: 1 }}
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={isSubmitting}
                        sx={{ margin: 1 }}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Comic'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

const style = ({
    mainContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: '90%',
       
        elevation: 3
    },
    image: {
        width: '100%',
        height: "100%",
        objectFit: "fit",
    },
    comicCreateForm: {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        margin: "0 0 0 2% ",
        padding: '10px',
        width: "75%"
    },
    comicImage: {
        width: '21%',
        height: "60%",
        marginLeft: '1%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black'
    },
    textField: (theme: any) => ({
        margin: theme.spacing(1),
        width: '70%'
    }),
    categorySelected: (theme: any) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        margin: theme.spacing(1),
        width: '70%',
        padding: '5px 0',
        border: '1px solid black',
        flexWrap: 'wrap',
        borderRadius: 2,
        minHeight: '66.5px'
    }),
    categorySelectedItem: (theme: any) => ({
        border: '1px solid black',
        margin: theme.spacing(1),
        borderRadius: 1,
    })
});
