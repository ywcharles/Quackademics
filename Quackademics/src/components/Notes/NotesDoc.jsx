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
} from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'
import { Box } from "@mui/material";


const Editor = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        width: "50vw",
        height: "90vh",
      }}>
      <MDXEditor
        markdown="# Hello world"
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
  );
};

export default Editor;
