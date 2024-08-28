import React, { useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import supabase from "../../libs/supabaseAdmin";

//TODO: Make page parse user_id
const FlashcardSetEdit = ({close, refreshFlashcardSets, flashcardSet}) => {
    const [setName, setSetName] = useState(flashcardSet.set_name);
    const [tags, setTags] = useState(flashcardSet.tags);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSetNameEntry = (event) => {
        setSetName(event.target.value);
    };
    
    const handleTagsEntry = (event) => {
        setTags(event.target.value);
    };

    const updateFlashcardSet = async () => {
        if(setName == ''){
            setErrorMessage("Set name cannot be blank.");
            return [];
        }

        const { data, error } = await supabase
            .from("flashcard_set")
            .update({ set_name: setName, tags: tags })
            .eq("set_id", flashcardSet.set_id)
            .select();
    
            if (error) {
                console.error("Error updating data:", error);
                if(error.code == 23505){
                    setErrorMessage("The set name must be unique");
                }
                return [];
            }
            else{
                close();
                if(errorMessage != ''){
                    setErrorMessage('');
                }
            }

            return data;
        };

        const updateProcess = async () => {
            await updateFlashcardSet();
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
            <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}> Set name </Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", mb: 1}}>
                <input id="setName" value={setName} onChange={handleSetNameEntry} style={{ height: "80%", width: "90%", resize: "none" }}/>
            </Box>

            <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}> Tags (comma separated) </Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", mb: 1}}>
                <input id="tags" value={tags} onChange={handleTagsEntry} style={{ height: "80%", width: "90%", resize: "none" }}/>
            </Box>
            <Typography sx={{ color: "red", ml: 1}}> {errorMessage} </Typography>
            <Box sx={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                <Button title="Save" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={updateProcess}>Save</Button>
                <Button title="Cancel" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={close}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default FlashcardSetEdit;