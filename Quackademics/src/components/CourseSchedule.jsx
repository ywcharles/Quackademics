import { Box, Typography, Button, Card, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import React, { useState } from "react";
import supabase from "../libs/supabaseAdmin";

const CourseSchedule = () => {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseStartTime, setCourseStartTime] = useState("");
    const [courseEndTime, setCourseEndTime] = useState("");
    const [error, setError] = useState("");

    const handleOpenDialog = () => {
        setOpen(true);
    };
    
    const handleCloseDialog = () => {
    setOpen(false);
    setCourseName("");
    setCourseCode("");
    setCourseStartTime("");
    setCourseEndTime("");
    setError("");
    };

    const handleAddCourseSchedule = async () => {
        if (!courseName || !courseCode || !courseStartTime || !courseEndTime) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const { data, error } = await supabase.from('courses').insert([
              {
                user_id: 42069, // replace this with the actual user id if available
                course_name: courseName,
                course_code: courseCode,
                course_start_time: courseStartTime,
                course_end_time: courseEndTime
              },
            ]);
      
            if (error) {
              console.error('Error inserting course:', error);
              setError("Failed to add course. Please try again.");
              return;
            }
      
            console.log('Course added:', data);
            handleCloseDialog();
      
            // Optionally, refresh courses list or update state
            setCourses([...courses, { id: data[0].id, name: courseName, code: courseCode, startTime: courseStartTime, endTime: courseEndTime }]);
          } catch (error) {
            console.error('Unexpected error:', error);
            setError("Unexpected error occurred. Please try again.");
          }
        
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
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        sx={{
                            padding: 2,
                            backgroundColor: "#424242",
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                    <Typography variant="h6">{course.name}</Typography>
                    <Typography variant="body2">Code: {course.code}</Typography>
                    <Typography variant="body2">Start Time: {course.startTime}</Typography>
                    <Typography variant="body2">End Time: {course.endTime}</Typography>
                    </Card>
                ))}
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
                onClick={handleOpenDialog}
            >
                add a course
            </Button>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Add a New Course</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Course Name"
                    type="text"
                    fullWidth
                    onChange={(e) => setCourseName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Course Code"
                    type="text"
                    fullWidth
                    onChange={(e) => setCourseCode(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Course Start Time"
                    helperText="HH:mm AM/PM"
                    type="time"
                    fullWidth
                    onChange={(e) => setCourseStartTime(e.target.value)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    label="Course End Time"
                    helperText="HH:mm AM/PM"
                    type="time"
                    fullWidth
                    onChange={(e) => setCourseEndTime(e.target.value)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                {error && <Typography color="error">{error}</Typography>}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddCourseSchedule} color="primary" variant="contained">
                    Add Course
                </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
  }
  
  export default CourseSchedule;