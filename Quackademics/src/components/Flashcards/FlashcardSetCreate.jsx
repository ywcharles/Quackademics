import React, { useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import supabase from "../../libs/supabaseAdmin";
import {useUserSessionStore} from "../../stores/UserSessionStore"

const FlashcardSetCreate = ({close, refreshFlashcardSets}) => {
    const [setName, setSetName] = useState('');
    const [tags, setTags] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const userId = useUserSessionStore((state) => state.userId);

    const handleSetNameEntry = (event) => {
        setSetName(event.target.value);
    };
    
    const handleTagsEntry = (event) => {
        setTags(event.target.value);
    };

    const createFlashcardSet = async () => {
        if(setName == ''){
            setErrorMessage("Set name cannot be blank.");
            return [];
        }

        const { data, error } = await supabase
        .from("flashcard_set")
        .insert([
            {
                user_id: userId,
                set_name: setName
            },
            ])
            .select();

        if (error) {
            console.error("Error inserting data:", error);
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

    const createProcess = async () => {
        await createFlashcardSet();
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
                borderRadius: "8px"
            }}
        >
            <Typography sx={{ fontWeight: "bold", color: "white", ml: 1, fontSize: 28, textAlign: "center", padding: 1 }}> Create Set </Typography>
            <Typography sx={{ fontWeight: "bold", color: "white", ml: 1, mb: 1}}> Set name: </Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", mb: 2,}}>
                <input id="setName" value={setName} onChange={handleSetNameEntry} style={{ height: "80%", width: "90%", resize: "none" }}/>
            </Box>
            <Typography sx={{ color: "red", ml: 1}}> {errorMessage} </Typography>
            <Box sx={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                <Button title="Save" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={createProcess}>Save</Button>
                <Button title="Cancel" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={close}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default FlashcardSetCreate;