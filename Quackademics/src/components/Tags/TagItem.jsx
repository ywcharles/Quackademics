import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, breadcrumbsClasses } from "@mui/material";

import supabase from "../../libs/supabaseAdmin";

const TagItem = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [tagType, setTagType] = useState("");

  const setFlashcardTitle = async () => {
    const { data, error } = await supabase
    .from("flashcard_set")
    .select("set_name")
    .eq("set_id", props.searchId);

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    setTitle(data[0].set_name);
  }

  const setDuckSessionTitle = async () => {
    const { data, error } = await supabase
      .from("rubber_duck_sessions")
      .select("session_text")
      .eq("session_id", props.searchId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    const sessionText = data[0].session_text;
    if (sessionText.length < 45){
      setTitle(sessionText);
    }else{
      setTitle(sessionText.slice(0, 45) + "...");
    }
  }

  const fetchTitle = async () => {
    switch (props.type) {
      case 1:
        setTagType("Notes");

        break;
      case 2:
        setTagType("Flashcards");
        await setFlashcardTitle();
        break;

      case 3:
        setTagType("RubberDuck");
        setDuckSessionTitle();
        
        break;

      default:
        setTagType("Unknown");
    }
  };

  useEffect(() => {
    fetchTitle();
  }, [props.type, props.searchId]);

  // TO-DO: Set up other pages
  const handleClick = (e) => {
    console.log(e.target);
    switch (props.type) {
      case 1:
        navigate(`/notes/${props.searchId}`);
        break;
      case 2:
        navigate(`/flashcards/${props.searchId}`);
        break;
      case 3:
        navigate(`/rubberduck/${props.searchId}`);
        break;
    }
  };

  return (
    <Button
      sx={{
        width: "100%",
        color: "black",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        border: 1,
        padding: 1,
        gap: 1,
        borderRadius: 2,
        textTransform: "none",
      }}
      onClick={handleClick}
    >
      <Typography variant="h6">{title}</Typography>

      <Typography variant="body2">{tagType}</Typography>
    </Button>
  );
};

export default TagItem;
