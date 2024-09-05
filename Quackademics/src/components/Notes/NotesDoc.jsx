import React from "react";
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
import { Box, Container } from "@mui/material";


const Editor = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '92vh',
        pt: "30px",
        
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
    </Container>

  );
};

export default Editor;
