// Button.stories.js|jsx

import React, { useState } from "react";

import { BlockState, TextField } from "./TextField";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: TextField.name,
  component: TextField,
};

export const Primary = () => {
  const [text, setText] = useState("");
  const blocks: BlockState[] = ["default", "notFound", "valid", "validInDifferent", "default"]


  return (
    <TextField
      value={text}
      onChange={(event) => {
        setText(event.target.value);
      }}
      blocks={blocks}
    ></TextField>
  );
};
