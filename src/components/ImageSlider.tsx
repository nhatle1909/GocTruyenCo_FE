import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from "react";
import NewReleasesIcon from '@mui/icons-material/NewReleases';



export const ImageSlider = () => {
    const Images = [
        { url: 'https://picsum.photos/id/237/500/300', id: 'Image 1' },
        { url: 'https://picsum.photos/id/238/500/300', id: 'Image 2' },
        { url: 'https://picsum.photos/id/239/500/300', id: 'Image 3' },
        { url: 'https://picsum.photos/id/240/500/300', id: 'Image 4' },
        { url: 'https://picsum.photos/id/241/500/300', id: 'Image 5' },
        { url: 'https://picsum.photos/id/242/500/300', id: 'Image 6' },
        { url: 'https://picsum.photos/id/243/500/300', id: 'Image 7' },
        { url: 'https://picsum.photos/id/244/500/300', id: 'Image 8' },

    ]
    const [currentSlide, setCurrentSlide] = useState(0);
    const imagesPerSlide = 7;
    const totalSlides = Math.ceil(Images.length / imagesPerSlide);
    const [currentSlideContent, setCurrentSlideContent] = useState([]);

    useEffect(() => {
        const updateSlideContent = (slideIndex: number) => {
            const startIndex = slideIndex * imagesPerSlide;
            setCurrentSlideContent(Images.slice(startIndex, startIndex + imagesPerSlide));
        };
        updateSlideContent(currentSlide);
    }, [currentSlide]);


    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={style.sliderWrapper}>
            <Typography variant="h5" sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                mb: 2,
                fontWeight: 600,

            }}>
                <NewReleasesIcon sx={{ mr: 1, color: 'primary.main', marginLeft: '2.5%', }} />
                Latest update
            </Typography>
            <Box sx={style.sliderContainer}>

                <IconButton
                    onClick={handlePrevSlide}
                    sx={style.navigationButton}
                    className="prev"
                >
                    <ArrowBackIosNewIcon color="primary" />
                </IconButton>

                <Box sx={style.imageContainer}>
                    {currentSlideContent.map(image => (
                        <Box key={image.id} sx={style.imageWrapper}>
                            <Box component="img" src={image.url} alt={image.title || image.id} sx={style.image} />
                        </Box>
                    ))}
                </Box>

                <IconButton
                    onClick={handleNextSlide}
                    sx={style.navigationButton}
                    className="next"
                >
                    <ArrowForwardIosIcon color="primary" />
                </IconButton>
            </Box>
        </Box>
    )
}

const style = {
    sliderWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10
    },
    sliderContainer: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 2,
        width: '100%',
        overflow: 'hidden',
    },
    imageWrapper: {
        position: 'relative',
        width: 200,
        height: 280,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        },
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'fit',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
    imageTitle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    navigationButton: {
      
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'primary.main'
        },
    
    },
};