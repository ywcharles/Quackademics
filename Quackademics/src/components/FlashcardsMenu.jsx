import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const FlashcardsMenu = () => {
    const [flashcards, setFlashcards] = useState(["Flashcard 1", "Flashcard 2"]);
    
    return (
        <Box>
            <TextField id="search" label="Search" variant="filled" 
            sx={{
                position: 'absolute',
                left: 8,
                top: "10%",
                width: "15%",
                backgroundColor: "#525252"
              }}
            />
            <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    bottom: "7%",
                    height: "72%",
                    width: "15%",
                    display: "flex",
                    overflow: "auto",
                    backgroundColor: "#615f5f",
                    alignItems: "left",
                    padding: 1
                }}
            >
                <Typography sx={{ fontWeight: 'bold' }}>
                    {flashcards.map((flashcard, index) => (
                        <div key={index}>
                            {flashcard}
                        </div>
                    ))}
                </Typography>
            </Box>
            <Box
            sx={{
                position: "absolute",
                left: 0,
                bottom: 0,
                height: "5%",
                width: "15%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                backgroundColor: "#615f5f",
                padding: 1
            }}
            >
                <Button
                    variant = "contained"
                sx={{
                    color: "white",
                    height: "100%",
                    width: "100%",
                    borderRadius: 2,
                    backgroundColor: "#6e6b6b",
                    overflow: "auto"
                }}
                >
                    New +
                </Button>
            </Box>
        </Box>  
    );
};

export default FlashcardsMenu;