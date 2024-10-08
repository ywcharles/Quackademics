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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const NotesDoc = () => {
  const searchId = useParams().notesId;
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [currNote, setCurrNote] = useState({
    note_id: null,
    course_id: null,
    title: null,
    content: null,
  });
  const [titleInput, setNoteTitleInput] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const userId = useUserSessionStore((state) => state.userId);

  const [markdownContent, setMarkdownContent] = useState(null);

  const handleCourseSelection = (event) => {
    console.log(event.target.value)
    setSelectedCourse(event.target.value);
  };
      
  const handleDeleteNoteCard = async (note) => {
    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("note_id", note.note_id);
    console.log("error", error);

    const { errorTags } = await supabase
      .from("tags_mapping")
      .delete()
      .eq("search_id", note.note_id)
      .eq("type", 1);

    if (errorTags) {
      console.error("Error deleting data:", errorTags);
    }

    await refreshNotes();
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        (note.content ?? '').toLowerCase().includes(event.target.value.toLowerCase()) ||
        (note.course_name ?? '').toLowerCase().includes(event.target.value.toLowerCase())
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
        course_id: selectedCourse.course_id,
        course_name: selectedCourse.course_name
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
            note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.course_name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      return data;
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const fetchedNotes = await fetchNotes();
      const fetchedCourses = await fetchCourses();
      setNotes(fetchedNotes);
      setFilteredNotes(fetchedNotes);
      setCourses(fetchedCourses);

      if (searchId) {
        let taggedNote = fetchedNotes.filter(
          (note) => note.note_id == searchId,
        )[0];
        console.log(taggedNote);
        setCurrNote(taggedNote);
        await handleCardClick(taggedNote);
      }
    };

    loadData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "700px",
        width: "1300px",
        mt: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#615f5f",
          height: "100%",
          width: "15vw",
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
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{note.title}</Typography>
                <Typography sx={{color: "white"}}>{note.course_name}</Typography>
                <TagsContainer type={1} sessionId={note.note_id} />
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
          width: "1300px",
        }}
      >
        <MDEditor
          value={markdownContent}
          onChange={setMarkdownContent}
          height="100%"
          style={{
            width: "-webkit-fill-available",
          }}
        />
      </Box>
      <Dialog open={open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
              width: "20vw",
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
          <InputLabel sx={{color: "white", ml: 1}}>Course:</InputLabel>
            <FormControl fullWidth>
            <Select
              id="course"
              value={selectedCourse}
              onChange={handleCourseSelection}
              sx={{width: "90%", height: "5vh", ml: 1, mb: 1, color: "white"}}
            >
              {courses.map((course) => (
              <MenuItem key={(course.course_id)} value={course}>{course.course_name}</MenuItem>
              ))}
            </Select>
            </FormControl>
          <Box
            sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}
          >
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
