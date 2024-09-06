import React, { useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import supabase from "../../libs/supabaseAdmin";

const FlashcardSetDelete = ({close, set_id, refreshFlashcardSets, refreshAllFlashcards, setCurrFlashcardSet, setTagsVisible,
                            setCurrFlashcard, setCardText}) => {
    const deleteFlashcardSet = async () => {
        const {errorCards} = await supabase
        .from("flashcards")
        .delete()
        .eq('set_id', set_id);

        const {errorSet} = await supabase
        .from("flashcard_set")
        .delete()
        .eq('set_id', set_id);

        if (errorSet) {
            console.error("Error deleting data:", errorSet);
        }
        if(errorCards) {
            console.error("Error deleting data:", errorCards);
        }

        setCurrFlashcardSet([])
        setTagsVisible("hidden")
        close();
        return [];
    };

    const deleteFlashcardSetTags = async () => {
        const {errorSet} = await supabase
        .from("tags_mapping")
        .delete()
        .eq('search_id', set_id)
        .eq('type', 2);

        if (errorSet) {
            console.error("Error deleting data:", errorSet);
        }

        return;
    }

    const deleteProcess = async () => {
        setCurrFlashcard([]);
        setCardText("");
        await deleteFlashcardSetTags();
        await deleteFlashcardSet();
        await refreshFlashcardSets();
        await refreshAllFlashcards();
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