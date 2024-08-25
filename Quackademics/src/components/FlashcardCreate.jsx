import React, { useState } from "react";
import { Box, Button, Typography} from "@mui/material";

const FlashcardCreate = ({close}) => {

        const saveFlashcard = () => {
            
        }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "40vw",
                height: "90vh",
                backgroundColor: "#525252",
            }}
        >
            <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}> Term </Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%"}}>
                <textarea id="term" style={{ height: "80%", width: "90%", resize: "none" }}/>
            </Box>

            <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}> Definition </Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%"}}>
                <textarea id="definition" style={{ height: "80%", width: "90%", resize: "none" }}/>
            </Box>
            <Box sx={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                <Button title="Save" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}}>Save</Button>
                <Button title="Cancel" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default FlashcardCreate;