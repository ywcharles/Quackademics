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
} from "@mdxeditor/editor";

const Editor = () => {
  return (
    <MDXEditor
      markdown="hello world"
      plugins={[
        headingsPlugin,
        toolbarPlugin({
          // toolbarContents: () => (
          // ),
        }),
      ]}
    />
  );
};

export default Editor;
