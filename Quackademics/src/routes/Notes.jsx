import React from "react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods,
  MDXEditorProps,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

const Notes = () => {
  return (
    <h1>
      Notes :3
      <div>
        MDEditor
        <MDXEditor
          plugin={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
          {...props}
          ref={editorREf}
        />
      </div>
    </h1>
  );
};

export default Notes;
