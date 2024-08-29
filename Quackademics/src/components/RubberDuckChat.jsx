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

import TagsContainer from "./TagsContainer";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Color Scheme Orange: FBAF00, Yellow: FFD639, Brown: 93827F, Green: 92B4A7, Gray: 2F2F2F

const RubberDuckChat = () => {
  const [textFieldContent, setTextFieldContent] = useState("");
  const [userQuacks, setUserQuacks] = useState([]);
  const [selectedQuack, setSelectedQuack] = useState(null);

  // TODO: Able to fetch userId
  const user = 42069;

  const date = new Date();
  const currDateTime = date.toISOString().slice(0, 19).replace("T", " ");

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
    const { data, error } = await supabase
      .from("rubber_duck_sessions")
      .insert([
        {
          user_id: userId,
          session_text: sessionText,
          created_at: currDateTime,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      return [];
    }

    return data;
  };

  const updateQuack = async (sessionId, sessionText) => {
    const { data, error } = await supabase
      .from("rubber_duck_sessions")
      .update({ session_text: sessionText, created_at: currDateTime })
      .eq("session_id", sessionId)
      .select();

    if (error) {
      console.error("Error updating data:", error);
      return [];
    }

    return data;
  };

  const fetchUserQuacks = async (userId) => {
    const { data, error } = await supabase
      .from("rubber_duck_sessions")
      .select("session_id, session_text, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }

    return data;
  };

  const handleSaveClick = async () => {
    if (selectedQuack && selectedQuack.session_id) {
      await updateQuack(selectedQuack.session_id, textFieldContent);
    } else {
      const newQuack = await insertQuack(user, textFieldContent);
      setSelectedQuack(newQuack[0]);
    }

    const quacks = await fetchUserQuacks(user);
    setUserQuacks(quacks);
  };

  const handleSelectClick = (quack) => {
    setSelectedQuack(quack);
    setTextFieldContent(quack.session_text);
  };

  const handleClear = () => {
    setTextFieldContent("");
    setSelectedQuack(null);
  };

  useEffect(() => {
    const loadQuacks = async () => {
      const quacks = await fetchUserQuacks(user);
      setUserQuacks(quacks);
    };

    loadQuacks();
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
        <TagsContainer type = {3} sessionId = {selectedQuack? selectedQuack.session_id : 0}></TagsContainer>
        <TextField
          value={textFieldContent}
          onChange={(e) => setTextFieldContent(e.target.value)}
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
            onClick={handleClear}
            sx={{ backgroundColor: "#2F2F2F", color: "white", width: "20%" }}
          >
            Clear
          </Button>
        </Box>
        <Button
          onClick={handleSaveClick}
          sx={{ backgroundColor: "#2F2F2F", color: "white", width: "100%" }}
        >
          Save
        </Button>

        <FormControl fullWidth>
          <InputLabel>Old conversations</InputLabel>
          <Select label="Old conversations">
            {userQuacks.map((quack, index) => (
              <MenuItem key={index} onClick={() => handleSelectClick(quack)}>
                {quack.session_text.slice(0, 30)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default RubberDuckChat;
