import { Button, Box, TextField, Avatar, Select, MenuItem } from "@mui/material";
import React from "react";

// Color SCheme Orange: FBAF00, Yellow: FFD639, Brown: 93827F, Green: 92B4A7, Gray: 2F2F2F
const RubberDuck = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#93827F",
        color: "white",
        padding: 2,
        borderRadius: 2,
        width: "50%",
        height: "80%",
      }}
    >
      <Avatar
        src={"/rubber_duck.jpeg"}
        alt="quackquack"
        sx={{
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <TextField />
      <Box
        sx={{
          display: "flex-inline",
        }}
      >
        <Button sx={{ backgroundColor: "#92B4A7", color: "white" }}>
          Quack to Me
        </Button>
        <Button sx={{ backgroundColor: "#2F2F2F", color: "white" }}>
          Save
        </Button>
      </Box>

      <Select
      sx={{
        width: "100%"
      }}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </Box>
  );
};

export default RubberDuck;
