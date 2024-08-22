import {
  Button,
  Box,
  TextField,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import supabase from "../libs/supabaseAdmin";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Color Scheme Orange: FBAF00, Yellow: FFD639, Brown: 93827F, Green: 92B4A7, Gray: 2F2F2F

const RubberDuckChat = () => {
  const [textFieldContent, setTextFieldContent] = useState("");
  // TODO: Able to fetch userId

  const startSpeechRecognition = () => {
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTextFieldContent((prevContent) => prevContent + transcript + " ");
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  };

  const insertQuack = async (userId, sessionText) => {
    const date = new Date();
    const currDateTime = date.toISOString().slice(0, 19).replace('T', ' ')
    const { data, error } = await supabase
      .from("rubber_duck_sessions")
      .insert([{ user_id: userId, session_text: sessionText, created_at: currDateTime}])
      .select();
    
    console.log(error)
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        height: "80vh",
        width: "100vh",
      }}
    >
      <Avatar
        src={"/rubber_duck.jpeg"}
        alt="quackquack"
        sx={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#93827F",
          padding: 2,
          borderRadius: 2,
          width: "100%",
          maxWidth: 600,
          height: 400,
        }}
      >
        <TextField
          value={textFieldContent}
          disabled
          multiline
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            width: "100%",
            height: "80%",
          }}
        />
        <Box
          sx={{
            display: "flex-inline",
            width: "100%",
          }}
        >
          <Button
            onClick={startSpeechRecognition}
            sx={{ backgroundColor: "#92B4A7", color: "white", width: "80%" }}
          >
            Quack to Me
          </Button>
          <Button
            onClick={() => insertQuack(session, user, textFieldContent)}
            sx={{ backgroundColor: "#2F2F2F", color: "white", width: "20%" }}
          >
            Save
          </Button>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Old conversations</InputLabel>
          <Select label="Old conversations">
            <MenuItem>Merge sort</MenuItem>
            <MenuItem>Servers and HTTP Requests</MenuItem>
            <MenuItem>Nutrition</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default RubberDuckChat;
