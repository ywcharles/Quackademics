import React, { useState } from "react";
import {
  MDXEditor,
  codeBlockPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  ConditionalContents,
  InsertCodeBlock,
  InsertSandpack,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  linkPlugin,
  CreateLink,
  ListsToggle,
  linkDialogPlugin,
  tablePlugin,
  InsertTable,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'
import { Box, Container, CardContent, Typography, Card, Divider, TextField, Button } from "@mui/material";
import supabase from "../../libs/supabaseAdmin";

const NotesDoc = () => {
  // const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // // Fetch notes from Supabase
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     const { data, error } = await supabase
  //       .from('notes')
  //       .select('*');

  //     if (error) {
  //       console.error('Error fetching notes:', error);
  //     } else {
  //       setNotes(data);
  //     }
  //   };

  //   fetchNotes();
  // }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // // Filter notes based on search query
  // const filteredNotes = notes.filter(note =>
  //   note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   note.content.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "row",
        height: '92vh',
        width: "100%",
        mt: "30px",
      }}
    >
      {/* query notes and saved notes */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#615f5f",
          height: "100%",
          width: "50vw",
          gap: 1
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
            height: "90%"
          }}
        >

        </Box>

        {/* Save and New Notes Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1
          }}
        >
          <Button variant="contained" color="primary" sx={{ width: "100%"}}>Save</Button>
          <Button variant="contained" color="primary" sx={{ width: "100%" }}>New Note</Button>
        </Box>
        
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            width: "65vw",
            minHeight: "100%",
            overflow: "auto",
          }}
        >
          <MDXEditor
            markdown='#'
            plugins={[
              headingsPlugin(),
              linkDialogPlugin(),
              linkPlugin,
              listsPlugin(),
              quotePlugin(),
              markdownShortcutPlugin(),
              tablePlugin(),
              toolbarPlugin({
                toolbarContents: () => {
                  return (
                    <>
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <BlockTypeSelect />
                      <CreateLink />
                      <ListsToggle />
                      <InsertTable />
                    </>
                  )
                }
              }),
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotesDoc;
