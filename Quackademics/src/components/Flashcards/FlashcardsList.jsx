import React, { useState } from "react";
import { Box, Button, Typography, MenuList, MenuItem, Dialog } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import supabase from "../../libs/supabaseAdmin";

const FlashcardsList = ({currFlashcardSet, currFlashcard, setCard, set_id, refreshAllFlashcards}) => {
    const [createEditPromptOpen, setCreateEditPromptOpen] = useState(false);
    const [deletePromptOpen, setDeletePromptOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const [dialogType, setDialogType] = useState('');
    
    const handleTermEntry = (event) => {
        setTerm(event.target.value);
    };
    
    const handleDefintionEntry = (event) => {
        setDefinition(event.target.value);
    };

    const handleFlashcardMenuClick = (item) => {
        setCard(item);
    }

    const handleOpenDialog = (dialogTypeParam) => {
        setDialogType(dialogTypeParam);
        if(dialogTypeParam != "delete"){
            if(dialogTypeParam === "create"){
                setTerm('');
                setDefinition('');
            }
            else{
                setTerm(currFlashcard.term);
                setDefinition(currFlashcard.definition);
            }
            setCreateEditPromptOpen(!createEditPromptOpen);
        }
        else {
            setDeletePromptOpen(!deletePromptOpen);
        }
    }

    const dialogProcess = async () =>{
        if(dialogType === "create"){
            await createFlashcard();
        }
        else if (dialogType === "edit") {
            console.log("editing process")
            await updateFlashcard();
        }
        else {
            await deleteFlashcard();
            setCard([]);
        }
        await refreshAllFlashcards();
        return;
    }

    const createFlashcard = async () => {
        console.log(term);
        console.log(definition);

        if(term == ''){
            setErrorMessage("Term cannot be blank.");
            return [];
        }
        if(definition == ''){
            setErrorMessage("Definition cannot be blank.");
            return [];
        }

        const { data, error } = await supabase
        .from("flashcards")
        .insert([
            {
                set_id: set_id,
                term: term,
                definition: definition
            },
            ])
            .select();

        if (error) {
            console.error("Error inserting data:", error);
            return [];
        }
        else{
            handleOpenDialog("create");
            if(errorMessage != ''){
                setErrorMessage('');
            }
        }

        return data;
    };

    const updateFlashcard = async () => {
        if(term == ''){
            setErrorMessage("Term cannot be blank.");
            return [];
        }
        if(definition == ''){
            setErrorMessage("Definition cannot be blank.");
            return [];
        }

        const { data, error } = await supabase
            .from("flashcards")
            .update({ term: term, definition: definition })
            .eq("flashcard_id", currFlashcard.flashcard_id)
            .select();
    
            if (error) {
                console.error("Error updating data:", error);
                return [];
            }
            else{
                handleOpenDialog("edit");
                if(errorMessage != ''){
                    setErrorMessage('');
                }
            }

            return data;
    };

    const deleteFlashcard = async () => {
        const {error} = await supabase
        .from("flashcards")
        .delete()
        .eq("flashcard_id", currFlashcard.flashcard_id);

        if (error) {
            console.error("Error deleting data:", error);
        }

        handleOpenDialog("delete");
        return [];
    }

    if(currFlashcardSet === undefined || set_id === "" ){
        return(<Box/>);
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", mt: 1  }}>
            <Box sx={{ backgroundColor: "#615f5f", width: "80%" }}>
                <Typography sx={{ fontWeight: "bold", mb: .5, mt: .5, fontSize: 20 }}>
                    Flashcards
                </Typography>
                <AddCircleIcon onClick={() => handleOpenDialog("create")}/>
            </Box>
            <MenuList 
                sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#615f5f",
                    overflowY: "scroll"
                }}>
                {currFlashcardSet.map((flashcard, index) => (
                    <MenuItem id="flashcard" key={index} 
                    onClick={() => handleFlashcardMenuClick(flashcard)}
                    sx={{
                        padding: 1,
                        ml: 1, 
                        mr: 2, 
                        width: "98%",
                        display: "flex",
                        border: "1px solid #ccc",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            {flashcard.term}
                        </Typography>
                        <Typography>
                            {flashcard.definition}
                        </Typography>
                        <Box>
                            <EditIcon onClick={() => handleOpenDialog("edit")} sx={{height: "30%"}}/>
                            <DeleteOutlineIcon onClick={() => handleOpenDialog("delete")} sx={{height: "30%"}}/>
                        </Box>
                    </MenuItem>
                ))}    
            </MenuList>
            <Dialog
            open={createEditPromptOpen}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20vw",
                    backgroundColor: "#525252",
                }}
            >
                <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}> Term </Typography>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", mb: 1}}>
                    <textarea id="term" value={term} onChange={handleTermEntry} style={{ height: "80%", width: "90%", resize: "none" }}/>
                </Box>

                <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}> Definition </Typography>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "80%", width: "100%", mb: 1}}>
                    <textarea id="definition" value={definition} onChange={handleDefintionEntry} style={{ height: "80%", width: "90%", resize: "none" }}/>
                </Box>
                <Typography sx={{ color: "red", ml: 1}}> {errorMessage} </Typography>
                <Box sx={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                    <Button title="Save" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={dialogProcess}>Save</Button>
                    <Button title="Cancel" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={() => handleOpenDialog("create")} >Cancel</Button>
                </Box>
            </Box>
            </Dialog>
            <Dialog
            open={deletePromptOpen}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20vw",
                    backgroundColor: "#525252",
                }}
            >
                <Typography sx={{ fontWeight: "bold", color: "white", padding: 1}}> Are you sure you want to delete the flashcard? </Typography>
                <Box sx={{display: "flex", justifyContent: "end", alignItems: "end"}}>
                    <Button title="Delete" sx={{backgroundColor: "red", color:"white", mr: 1, mb: 1}} onClick={dialogProcess}>Delete</Button>
                    <Button title="Cancel" sx={{backgroundColor: "cornflowerblue", color:"white", mr: 1, mb: 1}} onClick={() => handleOpenDialog("delete")}>Cancel</Button>
                </Box>
            </Box>
            </Dialog>
        </Box>
    );
}

export default FlashcardsList;