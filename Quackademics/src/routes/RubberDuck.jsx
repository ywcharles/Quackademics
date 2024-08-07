import {
  Button,
  Box,
  TextField,
  Avatar,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";

// Color SCheme Orange: FBAF00, Yellow: FFD639, Brown: 93827F, Green: 92B4A7, Gray: 2F2F2F
const RubberDuck = () => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      }}>
      <Avatar
          src={"/rubber_duck.jpeg"}
          alt="quackquack"
          sx={{
            width: "30%",
            height: "30%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          backgroundColor: "#93827F",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <TextField sx={{
          width: 500,
          height: 300 
        }}/>
        <Box
          sx={{
            display: "flex-inline",
            width: "100%"
          }}
        >
          <Button sx={{ backgroundColor: "#92B4A7", color: "white", width: "80%" }}>
            Quack to Me
          </Button>
          <Button sx={{ backgroundColor: "#2F2F2F", color: "white", width: "20%" }}>
            Save
          </Button>
        </Box>

        <Select
          sx={{
            width: "100%",
            height: 50
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default RubberDuck;
