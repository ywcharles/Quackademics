import React, { useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import supabase from "../../libs/supabaseAdmin";

//TODO: Make page parse user_id
const FlashcardSetDelete = ({close, set_id, refreshFlashcardSets}) => {
    const deleteFlashcardSet = async () => {
        const {error} = await supabase
        .from("flashcard_set")
        .delete()
        .eq('set_id', set_id);

        if (error) {
            console.error("Error deleting data:", error);
        }

        close();
        return [];
    };

    const deleteProcess = async () => {
        await deleteFlashcardSet();
        await refreshFlashcardSets();
        return;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "20vw",
                backgroundColor: "#525252",
            }}
        >
            <Typography sx={{ fontWeight: "bold", color: "white", padding: 1}}> Are you sure you want to delete the set? </Typography>
            <Box sx={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                <Button title="Delete" sx={{backgroundColor: "red", color:"white", mr: 1, mb: 1}} onClick={deleteProcess}>Delete</Button>
                <Button title="Cancel" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={close}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default FlashcardSetDelete;