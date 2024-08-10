import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const FlashcardsMenu = () => {
    const [flashcards, setFlashcards] = useState(["Flashcard 1", "Flashcard 2"]);
    const [searchInput, setSearchInput] = useState("");

    const searchInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    const filteredFlashcards = flashcards.filter(flashcard =>
        flashcard.toLowerCase().includes(searchInput)
    )

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <TextField id="search" label="Search" variant="filled" onChange={searchInputChange}
                sx={{
                    width: "100%",
                    backgroundColor: "#525252",
                    mb: 1,
                    ml: 1
                }}
                />
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        overflow: "auto",
                        backgroundColor: "#615f5f",
                        alignItems: "left",
                        padding: 1
                    }}
                >
                    <Typography sx={{ fontWeight: "bold" }}>
                        {filteredFlashcards.map((flashcard, index) => (
                            <span style={{display: "block"}} key={index}>
                                {flashcard}
                            </span>
                        ))}
                    </Typography>
                </Box>
                <Box
                sx={{
                    width: "100%",
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
            
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ position: "relative", height: "80vh", width: "70vw", left: "10%"}}>
                    <Box
                        sx={{
                            position: "absolute",
                            height: "65vh",
                            width: "57vw",
                            top: "13%",
                            backgroundColor: "#615f5f",
                            border: "2px solid white",
                            padding: 1,
                            zIndex: 3,
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold", color: 'white' }}>
                            Flashcard
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            position: "absolute", 
                            height: "65vh",
                            width: "57vw",
                            top: "13%",
                            backgroundColor: "#615f5f",
                            border: "2px solid black",
                            padding: 1,
                            zIndex: 2,
                            left: 50,
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute", 
                            height: "65vh",
                            width: "57vw",
                            top: "13%",
                            backgroundColor: "#615f5f",
                            border: "2px solid black",
                            padding: 1,
                            zIndex: 1,
                            left: 100,
                        }}
                    />
                </Box>
            </Box>
            
        </Box>
    );
};

export default FlashcardsMenu;