import React, { useState } from "react";
import { Box, Button, TextField, Typography, Dialog, MenuList, MenuItem } from "@mui/material";

const FlashcardsList = ({currFlashcardSet}) => {


    return (
        <Box>
            <MenuList sx={{width: "100%"}}>
                {currFlashcardSet.map((flashcardSet, index) => (
                    <MenuItem id="flashcard" key={index} 
                    sx={{padding: 0, 
                        margin: 0, 
                        mb: 1, 
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    onClick={() => flashcardSetSelected(flashcardSet)}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            {flashcardSet.set_name}
                        </Typography>
                        <Box>
                            <EditIcon onClick={(handleFlashcardEditDialogue)} sx={{height: "30%"}}/>
                            <DeleteOutlineIcon onClick={(handleFlashcardDeleteDialogue)} sx={{height: "30%"}}/>
                        </Box>
                    </MenuItem>
                ))}    
            </MenuList>
        </Box>
    );
}

export default FlashcardsList;