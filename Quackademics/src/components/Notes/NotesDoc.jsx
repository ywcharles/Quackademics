import React, { useState, useEffect } from "react";
import "@mdxeditor/editor/style.css";
import {
  Box,
  CardContent,
  Typography,
  Card,
  TextField,
  Button,
  Dialog,
  IconButton,
} from "@mui/material";
import supabase from "../../libs/supabaseAdmin";
import "./Notes.css";
import { useUserSessionStore } from "../../stores/UserSessionStore";
import { DeleteIcon, EditIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import TagsContainer from "../TagsContainer";
import { useParams } from "react-router-dom";

const NotesDoc = () => {
  const searchId = useParams().notesId;
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [currNote, setCurrNote] = useState({note_id: null, course_id: null, title: null, content: null});
  const [titleInput, setNoteTitleInput] = useState("");
  const userId = useUserSessionStore((state) => state.userId);

  const [markdownContent, setMarkdownContent] = useState(null);

  const handleDeleteNoteCard = async (note) => {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("note_id", note.note_id);
    console.log("error", error);
    await refreshNotes();
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(event.target.value),
      ),
    );
  };

  const handleTitleChange = (event) => {
    setNoteTitleInput(event.target.value);
  };

  const handleCardClick = async (note) => {
    setCurrNote(note);
    const { data } = await supabase
      .from("notes")
      .select()
      .eq("note_id", note.note_id);
    if (data[0].content !== null) {
      setMarkdownContent(data[0].content);
    }
    console.log(note.content);
  };

  const handleEditClick = async (note) => {
    console.log(note.title);
    setNoteTitleInput(note.title);
    setOpen(!open);
    return;
  };

  const handleSaving = async () => {
    console.log("input", titleInput);
    console.log("title", currNote.title);
    console.log("note", currNote);
    console.log(markdownContent);

    const { data, error } = await supabase
      .from("notes")
      .update({
        note_id: currNote.note_id,
        title: titleInput,
        content: markdownContent,
      })
      .eq("note_id", currNote.note_id)
      .select();

    if (error) {
      console.error("Error updating data:", error);
    }

    await refreshNotes();
    setOpen(!open);
    return;
  };

  const handleCancel = () => {
    setOpen(!open);
    setNoteTitleInput("");
    return;
  };

  const handleNewNoteClick = async () => {
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: userId,
          title: "New note",
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      return [];
    }

    setCurrNote(data);
    console.log(data);
    refreshNotes();
  };

  const refreshNotes = async () => {
    let notes = await fetchNotes();
    setNotes(notes);
    if (searchQuery) {
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredNotes(notes);
    }
  };

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      return data;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const fetchedNotes = await fetchNotes();
      setNotes(fetchedNotes);
      setFilteredNotes(fetchedNotes);

      if(searchId){
        let taggedNote = fetchedNotes.filter(note => note.note_id == searchId)[0];
        console.log(taggedNote)
        setCurrNote(taggedNote)
    }
    };

    loadData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "92vh",
        width: "100%",
        mt: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#615f5f",
          height: "100%",
          width: "50vw",
          gap: 1,
        }}
      >
        {/* Search */}
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Past Notes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "90%",
          }}
        >
          {/* TODO: create cards for each saved notes */}
          {/* might need fixing... since theres no notes, i haven't seen what these look like */}
          {filteredNotes.map((note) => (
            <Card
              key={note.note_id}
              sx={{ marginBottom: 2, backgroundColor: "#6e6b6b" }}
              onClick={() => handleCardClick(note)}
            >
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.content}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={() => handleEditClick(note)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteNoteCard(note)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Save and New Notes Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            onClick={handleNewNoteClick}
          >
            New Note
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <MDEditor value={markdownContent} onChange={setMarkdownContent} />
      </Box>
      <Dialog open={open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50vw",
            backgroundColor: "#525252",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "white", ml: 1 }}>
            Note title:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80%",
              width: "100%",
              mb: 1,
            }}
          >
            <input
              id="noteTitle"
              value={titleInput}
              onChange={handleTitleChange}
              style={{ height: "80%", width: "90%", resize: "none" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}
          >
            <TagsContainer type={1} sessionId={currNote.note_id}/>
            <Button
              title="Save"
              sx={{
                backgroundColor: "cornflowerblue",
                color: "white",
                mr: 1,
                mb: 1,
              }}
              onClick={handleSaving}
            >
              Save
            </Button>
            <Button
              title="Cancel"
              sx={{
                backgroundColor: "cornflowerblue",
                color: "white",
                mr: 1,
                mb: 1,
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default NotesDoc;
