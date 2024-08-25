import React, { useState } from "react";
import { Box, Button, Typography} from "@mui/material";
import supabase from "../libs/supabaseAdmin";


//TODO: Make page parse user_id
const FlashcardSetCreate = ({close}) => {
    const [setName, setSetName] = useState('');
    const [tags, setTags] = useState('');
    const [setNameError, setSetNameError] = useState('');

    const handleSetNameEntry = (event) => {
        setSetName(event.target.value);
    };
    
    const handleTagsEntry = (event) => {
        setTags(event.target.value);
    };


    const saveFlashcardSet = async () => {
        const { data, error } = await supabase
            .from("flashcard_set")
            .insert([
                {
                //Hardcoded user_id for now
                  user_id: 42069,
                  set_name: setName,
                  tags: tags
                },
              ])
              .select();
    
            if (error) {
                console.error("Error inserting data:", error);
                if(error.code == 23505){
                    setSetNameError("The set name must be unique");
                }
                return [];
            }
            else{
                close();
                if(setNameError != ''){
                    setSetNameError('');
                }
            }
            return data;
        
        };

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
            <Typography sx={{ color: "red", ml: 1}}> {setNameError} </Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", mb: 1}}>
                <input id="setName" value={setName} onChange={handleSetNameEntry} style={{ height: "80%", width: "90%", resize: "none" }}/>
            </Box>

            <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}> Tags </Typography>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", mb: 1}}>
                <input id="tags" value={tags} onChange={handleTagsEntry} style={{ height: "80%", width: "90%", resize: "none" }}/>
            </Box>
            <Box sx={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                <Button title="Save" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={saveFlashcardSet}>Save</Button>
                <Button title="Cancel" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={close}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default FlashcardSetCreate;