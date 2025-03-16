import { Box, Grid2, Paper, Stack, Typography, useTheme } from "@mui/material";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { ComicItem } from "./ComicItem";

export const PopularManga = () => {
    const theme = useTheme();

    const styles = {
        leftSection: {
            flex: '1 1 70%',
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
            objectFit: 'cover',
        },
        updateInfo: {
            flex: 1,
        },
        updateTitle: {
            fontWeight: 600,
            mb: 0.5,
        },
    };

    return (
        <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={styles.leftSection}>
                <Box sx={styles.comicSection}>
                    {/* <Typography variant="h5" sx={styles.sectionTitle}>
                        Manga
                    </Typography> */}
                    <Grid2 container spacing={2}>
                        {[1, 2, 3].map((item) => (
                            <Grid2 key={`popular-${item}`} xs={12} sm={6} md={4}>
                                <ComicItem />
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </Box>

            <Box sx={styles.rightSection}>
                <Paper elevation={1} sx={styles.rightSectionPaper}>
                    <Typography variant="h5" sx={styles.sectionTitle}>
                        <WhatshotIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                        Popular Manga
                    </Typography>
                    <Stack spacing={2}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <Paper key={item} sx={styles.updateItem}>
                                <Box 
                                    component="img"
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
    );
};