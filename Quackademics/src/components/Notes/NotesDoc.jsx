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
  );
};

export default Editor;
