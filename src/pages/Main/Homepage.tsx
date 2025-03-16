import { Box, Container, Grid2, Paper, Stack, Typography, useTheme } from "@mui/material";
import { ImageSlider } from "../../components/ImageSlider";
import { ComicItem } from "../../components/common/ComicItem";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const Homepage = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="xl" sx={styles.container}>
            <ImageSlider />

            <Box sx={styles.mainContent}>
                {/* Left Section - Comic Lists */}
                <Box sx={styles.leftSection}>
                    {/* Popular Comics Row */}
                    <Box sx={styles.comicSection}>
                        {/* <Typography variant="h5" sx={styles.sectionTitle}>
                            Manga
                        </Typography> */}
                        <Grid2 container spacing={2} sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <Grid2 size={4}>
                                <ComicItem />
                            </Grid2>
                            <Grid2 size={4}>
                                <ComicItem />
                            </Grid2>
                            <Grid2 size={4}>
                                <ComicItem />
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>

                {/* Right Section - Latest Updates */}
                <Box sx={styles.rightSection}>
                 

                    {/* Popular Manga Section */}
                    <Paper elevation={1} sx={[styles.rightSectionPaper, { mt: 3 }]}>
                        <Typography variant="h5" sx={styles.sectionTitle}>
                            <WhatshotIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                            Popular Manga
                        </Typography>
                        <Stack spacing={2}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Paper key={item} sx={styles.updateItem}>
                                    <Box component="img"
                                        src="https://picsum.photos/id/244/500/300"
                                        sx={styles.updateImage}
                                    />
                                    <Box sx={styles.updateInfo}>
                                        <Typography variant="subtitle1" sx={styles.updateTitle}>
                                            Comic Title {item}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Chapter {item} • 2 hours ago
                                        </Typography>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        pb: 4,
    },
    mainContent: {
        display: 'flex',
        gap: 3,
        mt: 4,
    },
    leftSection: {
        flex: '1 1 70%',
        marginLeft:'2.5%',
        marginTop:'1.75%',
    },
    comicSection: {
        mb: 4,
    },
    rightSection: {
        flex: '1 1 30%',
        minWidth: 300,
    },
    rightSectionPaper: {
        p: 2,
        borderRadius: 2,
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        fontWeight: 600,
    },
    updateItem: {
        display: 'flex',
        alignItems: 'center',
        p: 1,
        gap: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
    },
    updateImage: {
        width: 80,
        height: 80,
        borderRadius: 1,
        objectFit: 'objectfit',
    },
    updateInfo: {
        flex: 1,
    },
    updateTitle: {
        fontWeight: 600,
        mb: 0.5,
    },
};
