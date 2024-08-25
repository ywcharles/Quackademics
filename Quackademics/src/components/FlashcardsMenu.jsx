import React, { useState } from "react";
import { Box, Button, TextField, Typography, Dialog } from "@mui/material";
import { AddCard } from "@mui/icons-material";
import FlashcardBackground from "./FlashcardBackground";
import FlashcardCreate from "./FlashcardCreate";

const FlashcardsMenu = () => {
    const [flashcards, setFlashcards] = useState(["Flashcard 1", "Flashcard 2"]);
    const [currFlashcardSet, setCurrFlashcardSet] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [open, setOpen] = React.useState(false);

    const rootElement = document.getElementById('root');
    rootElement.style.padding = "0";
    rootElement.style.margin = "0";
    rootElement.style.height = "100vh";

    const searchInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    const flashcardSelected = (flashcard) => {
        setCurrFlashcardSet(flashcard);
      };

    const filteredFlashcards = flashcards.filter(flashcard =>
        flashcard.toLowerCase().includes(searchInput)
    )

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "6%",
                width: "98vw",
                height: "88vh",
                ml: "1%"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
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
                            <span id="flashcard" style={{display: "block"}} key={index} onClick={() => flashcardSelected(flashcard)}>
                                {flashcard}
                            </span>
                        ))}
                    </Typography>
                </Box>
                <Box
                sx={{
                    width: "100%",
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
                    onClick={handleClickOpen}
                    >
                        <AddCard/>
                    </Button>
                </Box>
            </Box>
            <Dialog
            open={open}
            onClose={handleClose}
            >
                <FlashcardCreate close={handleClose}/>
            </Dialog>
            
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
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
                            {currFlashcardSet}
                        </Typography>
                    </Box>
                    <FlashcardBackground/>
                </Box>

            </Box>
            
        </Box>
    );
};

export default FlashcardsMenu;