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

import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import supabase from "../libs/supabaseAdmin";

import TagsContainer from "./TagsContainer";
import { useUserSessionStore } from "../stores/UserSessionStore";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Color Scheme Orange: FBAF00, Yellow: FFD639, Brown: 93827F, Green: 92B4A7, Gray: 2F2F2F

const RubberDuckChat = () => {
  const searchId = useParams().sessionId;
  const [textFieldContent, setTextFieldContent] = useState("");
  const [userQuacks, setUserQuacks] = useState([]);
  const [selectedQuack, setSelectedQuack] = useState(null);
  const user = useUserSessionStore((state) => state.userId);

  const [isTalking, setIsTalking] = useState(false);

  const date = new Date();
  const currDateTime = date.toISOString().slice(0, 19).replace("T", " ");

  const startSpeechRecognition = () => {
    setIsTalking(true);
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTextFieldContent((prevContent) => prevContent + transcript + " ");
      setIsTalking(false);
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

  const fetchUrlQuack = async () => {
    const { data, error } = await supabase
      .from("rubber_duck_sessions")
      .select()
      .eq("session_id", searchId);

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
      if (textFieldContent && textFieldContent.length > 0) {
        const newQuack = await insertQuack(user, textFieldContent);
        setSelectedQuack(newQuack[0]);
      }
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

  // ToDo: Check if URL has an id and if so load it
  useEffect(() => {
    const loadQuacks = async () => {
      const quacks = await fetchUserQuacks(user);
      console.log(searchId);
      let urlQuack = null;
      if (searchId) {
        urlQuack = await fetchUrlQuack();
        setSelectedQuack(urlQuack[0]);
        setTextFieldContent(urlQuack[0].session_text);
      }

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
      <img
        width={500}
        height={500}
        style={{ imageRendering: "pixelated" }}
        src={isTalking ? "/babyboy_talk.png" : "/babyboy_nobg.png"}
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
          maxWidth: 1000,
          height: "80%",
        }}
      >
        {selectedQuack && selectedQuack.session_id && (
          <TagsContainer type={3} sessionId={selectedQuack.session_id} />
        )}
        <TextField
          value={textFieldContent}
          onChange={(e) => setTextFieldContent(e.target.value)}
          multiline
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            width: "100%",
            height: "80%",
            overflowY: "auto",
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
