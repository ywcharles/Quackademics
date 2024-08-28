import { Box, Typography, Button } from "@mui/material";
import React from "react";

const CourseSchedule = () => {

    const handleAddCourseSchedule = () => {
        console.log("adding course");
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#615f5f",
                color: "white",
                borderRadius: 2,
                width: "100%",
                height: "100%",
                gap: 2,
            }}
        >
            <Typography sx={{ fontWeight: "bold", color: "white", mt: 2 }}> Course Schedule </Typography>
            <Box
                sx={{
                    height: "82%",
                }}
            >
                course cards here
            </Box>
            <Button
                variant = "contained"
                color = "secondary"
                sx={{
                    color: "white",
                    width: "95%",
                    borderRadius: 2,
                    overflow: "auto",
                }}
                onClick={handleAddCourseSchedule}
            >
                add a course
            </Button>
        </Box>
    )
  }
  
  export default CourseSchedule;