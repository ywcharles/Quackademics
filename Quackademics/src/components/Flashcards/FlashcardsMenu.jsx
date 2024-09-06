import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Dialog, MenuList, MenuItem } from "@mui/material";
import { AddCard } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlashcardBackground from "./FlashcardBackground";
import FlashcardSetCreate from "./FlashcardSetCreate";
import FlashcardSetEdit from "./FlashcardSetEdit";
import FlashcardSetDelete from "./FlashcardSetDelete";
import FlashcardsList from "./FlashcardsList";
import supabase from "../../libs/supabaseAdmin";
import {useUserSessionStore} from "../../stores/UserSessionStore"

const FlashcardsMenu = () => {
    const [flashcardSets, setFlashcardSet] = useState([]);
    const [allFlashcards, setAllFlashcards] = useState([]);
    const [filteredFlashcards, setFilteredFlashcards] = useState([]);
    const [filteredFlashcardSets, setfilteredFlashcardSets] = useState([]);
    const [currFlashcardSet, setCurrFlashcardSet] = useState({set_name: "", set_id: ""});
    const [currFlashcard, setCurrFlashcard] = useState("");
    const [cardSide, setCardSide] = useState("");
    const [cardText, setCardText] = useState("");
    const [createPromptOpen, setCreatePromptOpen] = useState(false);
    const [editPromptOpen, setEditPromptOpen] = useState(false);
    const [deletePromptOpen, setDeletePromptOpen] = useState(false);
    const userId = useUserSessionStore((state) => state.userId);

    const rootElement = document.getElementById('root');
    rootElement.style.padding = "0";
    rootElement.style.margin = "0";
    rootElement.style.height = "100vh";

    const searchInputChange = (event) => {
        setfilteredFlashcardSets(
            flashcardSets.filter(entry =>
                entry.set_name.toLowerCase().includes(event.target.value)
            )
        )
    }

    const flashcardSetSelected = (flashcardSet) => {
        setCurrFlashcardSet(flashcardSet);
        setFilteredFlashcards(allFlashcards.filter(flashcard => flashcard.set_id === flashcardSet.set_id));
    };

    const setCard = (flashcard) => {
        setCurrFlashcard(flashcard);
        setCardText(flashcard.term);
        setCardSide("front");
    }
    
    const flipCard = () => {
        if(cardSide === "front"){
            setCardText(currFlashcard.definition);
            setCardSide("back");
        }
        else{
            setCardText(currFlashcard.term);
            setCardSide("front");
        }
    }

    const changeCard = (direction) => {
        let index = filteredFlashcards.findIndex((card) => card.flashcard_id === currFlashcard.flashcard_id);
        if(index === -1){
            return;
        }
        console.log(index)
        if(direction === "next"){
            if(index === filteredFlashcards.length - 1){
                index = 0;
            }
            else{
                index = index + 1;
            }
        }
        else{
            if(index === 0){
                index = filteredFlashcards.length - 1;
            }
            else{
                index = index - 1;
            }
        }
        console.log(index)
        console.log(filteredFlashcards[index])
        setCurrFlashcard(filteredFlashcards[index]);
        setCardText(filteredFlashcards[index].term);
        setCardSide("front");
    }

    const handleOpenDialog = (dialogType) => {
        if(dialogType === "create"){
            if(userId === null){
                alert("User login required for flashcard creation");
                return;
            }
            setCreatePromptOpen(!createPromptOpen);
        }
        else if (dialogType === "edit") {
            setEditPromptOpen(!editPromptOpen);
        }
        else {
            setDeletePromptOpen(!deletePromptOpen);
        }
    }

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

    const fetchAllFlashcards = async (setData) => {
        let tempArr = [];

        for(const flashcardSet of setData){
            const { data, error } = await supabase
            .from("flashcards")
            .select("set_id, term, definition, flashcard_id")
            .eq("set_id", flashcardSet.set_id);
        
            if (error) {
                console.error("Error fetching data:", error);
            }
            else{
                tempArr.push(...data)
            }
        };

        return tempArr;
    }

    const refreshFlashcardSets = async () => {
        const data = await fetchFlashcardSets(userId);
        setFlashcardSet(data);
        const searchValue = document.getElementById("search").value;
        if(searchValue != ''){
            setfilteredFlashcardSets(
                data.filter(entry =>
                    entry.set_name.toLowerCase().includes(searchValue)
                )
            )
        }
        else{
            setfilteredFlashcardSets(data);
        }
        return;
    };

    const refreshAllFlashcards = async () => {
        const cardData = await fetchAllFlashcards(flashcardSets);
        setAllFlashcards(cardData);
        setFilteredFlashcards(cardData.filter(flashcard => flashcard.set_id === currFlashcardSet.set_id));
        return;
    }

    useEffect(() => {
        if(!userId){
            return;
        }
        const loadData = async () => {
            const setData = await fetchFlashcardSets(userId);
            const cardData = await fetchAllFlashcards(setData);
            setFlashcardSet(setData);
            setfilteredFlashcardSets(setData);
            setAllFlashcards(cardData);
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
                        flexDirection: "column",
                        overflow: "auto",
                        backgroundColor: "#615f5f",
                        padding: 1
                    }}
                >
                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                        Flashcard Sets
                    </Typography>
                    <MenuList sx={{width: "100%"}}>
                        {filteredFlashcardSets.map((flashcardSet, index) => (
                            <MenuItem id="flashcard" key={index} 
                            sx={{padding: 1, 
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid #ccc"
                            }}
                            onClick={() => flashcardSetSelected(flashcardSet)}>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {flashcardSet.set_name}
                                </Typography>
                                <Box>
                                    <EditIcon onClick={() => handleOpenDialog("edit")} sx={{height: "30%"}}/>
                                    <DeleteOutlineIcon onClick={(() => handleOpenDialog("delete"))} sx={{height: "30%"}}/>
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
                    onClick={() => handleOpenDialog("create")}
                    >
                        <AddCard/>
                    </Button>
                </Box>
            </Box>
            <Dialog
            open={createPromptOpen}
            >
                <FlashcardSetCreate close={() => handleOpenDialog("create")} refreshFlashcardSets={refreshFlashcardSets}/>
            </Dialog>
            <Dialog
            open={editPromptOpen}
            >
                <FlashcardSetEdit close={() => handleOpenDialog("edit")} refreshFlashcardSets={refreshFlashcardSets} flashcardSet={currFlashcardSet}/>
            </Dialog>
            <Dialog
            open={deletePromptOpen}
            >
                <FlashcardSetDelete close={() => handleOpenDialog("delete")} set_id={currFlashcardSet.set_id} refreshFlashcardSets={refreshFlashcardSets}
                                    refreshAllFlashcards={refreshAllFlashcards}/>
            </Dialog>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box sx={{ overflowY: "scroll", height: "100vh", width: "70vw", left: "10%"}}>
                    <Box sx={{ position: "relative", height: "75vh", width: "89%", left: "10%"}}>
                        <Box
                            sx={{
                                display:"flex", 
                                flexDirection: "row",
                                position: "absolute",
                                height: "70%",
                                width: "89%",
                                top: "13%",
                                backgroundColor: "#615f5f",
                                border: "2px solid white",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <ArrowBackIosIcon sx={{ml: 1}} onClick={() => changeCard("prev")}/>
                            <Box sx={{width: "100%", height:"100%"}}onClick={flipCard}>
                                <Typography sx={{
                                    display:"flex",
                                    justifyContent: "center",
                                    alignItems: "center",  
                                    fontWeight: "bold", 
                                    color: 'white', 
                                    height:"100%", 
                                    width:"100%",
                                    fontSize: 24}}>
                                    {cardText}
                                </Typography>
                            </Box>
                            <ArrowForwardIosIcon sx={{mr: 1}} onClick={() => changeCard("next")}/>
                        </Box>
                    </Box>
                    <FlashcardsList currFlashcardSet={filteredFlashcards}
                                    currFlashcard={currFlashcard}
                                    setCard={setCard}
                                    set_id={currFlashcardSet.set_id}
                                    refreshAllFlashcards={refreshAllFlashcards}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default FlashcardsMenu;