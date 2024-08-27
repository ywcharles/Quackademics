import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Dialog, MenuList, MenuItem } from "@mui/material";
import { AddCard } from "@mui/icons-material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlashcardBackground from "./FlashcardBackground";
import FlashcardSetCreate from "./FlashcardSetCreate";
import FlashcardSetEdit from "./FlashcardSetEdit";
import FlashcardSetDelete from "./FlashcardSetDelete";
import FlashcardsList from "./FlashcardsList";
import EditIcon from '@mui/icons-material/Edit';
import supabase from "../libs/supabaseAdmin";

const FlashcardsMenu = () => {
    const [flashcardSets, setFlashcardSet] = useState([]);
    const [filteredFlashcardSet, setFilteredFlashcardSet] = useState([]);
    const [currFlashcardSet, setCurrFlashcardSet] = useState({set_name: "", set_id: ""});
    const [createPromptOpen, setCreatePromptOpen] = useState(false);
    const [editPromptOpen, setEditPromptOpen] = useState(false);
    const [deletePromptOpen, setDeletePromptOpen] = useState(false);

    const rootElement = document.getElementById('root');
    rootElement.style.padding = "0";
    rootElement.style.margin = "0";
    rootElement.style.height = "100vh";

    const searchInputChange = (event) => {
        setFilteredFlashcardSet(
            flashcardSets.filter(entry =>
                entry.set_name.toLowerCase().includes(event.target.value)
            )
        )
    }

    const flashcardSetSelected = (flashcardSet) => {
        setCurrFlashcardSet(flashcardSet);
    };

    const handleFlashcardCreateDialogue = () => {
        setCreatePromptOpen(!createPromptOpen);
    };

    const handleFlashcardEditDialogue = () => {
        setEditPromptOpen(!editPromptOpen);
    }

    const handleFlashcardDeleteDialogue = () => {
        setDeletePromptOpen(!deletePromptOpen);
    };

    const fetchFlashcardSets = async (userId) => {
        const { data, error } = await supabase
        .from("flashcard_set")
        .select("set_name, set_id, tags")
        .eq("user_id", userId)
        .order("set_name", { ascending: true });
    
        if (error) {
            console.error("Error fetching data:", error);
            return [];
        }

        return data;
    };

    const refreshFlashcardSets = async () => {
        const data = await fetchFlashcardSets(42069);
        setFlashcardSet(data);
        const searchValue = document.getElementById("search").value;
        if(searchValue != ''){
            setFilteredFlashcardSet(
                data.filter(entry =>
                    entry.set_name.toLowerCase().includes(searchValue)
                )
            )
        }
        else{
            setFilteredFlashcardSet(data);
        }
        return;
    }

    //Hardcoded user_id for now
    useEffect(() => {
        const loadData = async () => {
            const data = await fetchFlashcardSets(42069);
            setFlashcardSet(data);
            setFilteredFlashcardSet(data);
          };

          loadData();
    }, []);

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
                        flexDirection: "row",
                        overflow: "auto",
                        backgroundColor: "#615f5f",
                        padding: 1
                    }}
                >
                    <MenuList sx={{width: "100%"}}>
                        {filteredFlashcardSet.map((flashcardSet, index) => (
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
                    onClick={handleFlashcardCreateDialogue}
                    >
                        <AddCard/>
                    </Button>
                </Box>
            </Box>
            <Dialog
            open={createPromptOpen}
            >
                <FlashcardSetCreate close={handleFlashcardCreateDialogue} refreshFlashcardSets={refreshFlashcardSets}/>
            </Dialog>
            <Dialog
            open={editPromptOpen}
            >
                <FlashcardSetEdit close={handleFlashcardEditDialogue} refreshFlashcardSets={refreshFlashcardSets} flashcardSet={currFlashcardSet}/>
            </Dialog>
            <Dialog
            open={deletePromptOpen}
            >
                <FlashcardSetDelete close={handleFlashcardDeleteDialogue} set_id={currFlashcardSet.set_id} refreshFlashcardSets={refreshFlashcardSets}/>
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
                            {currFlashcardSet.set_name}
                        </Typography>
                    </Box>
                    <FlashcardBackground/>
                </Box>

                <FlashcardsList currFlashcardSet={currFlashcardSet} />
            //Insert flashcardmenu here
            </Box>
        </Box>
    );
};

export default FlashcardsMenu;