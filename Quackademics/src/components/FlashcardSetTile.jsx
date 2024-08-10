import React from "react";
import { Box, Typography } from "@mui/material";

const FlashcardSetTile = () => {

    return (
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
    );
};

export default FlashcardSetTile;
