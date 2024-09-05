import React, { useState, useEffect } from "react";
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
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
 
  // not tested fetchNotes since theres no existing notes
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select('*');
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {/* TODO: create cards for each saved notes */}
          {/* might need fixing... since theres no notes, i haven't seen what these look like */}
          {filteredNotes.map(note => (
            <Card key={note.note_id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2">{note.content}</Typography>
              </CardContent>
            </Card>
          ))}
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
