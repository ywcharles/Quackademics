import { Box, Typography, Button, Card, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import supabase from "../libs/supabaseAdmin";

const CourseSchedule = () => {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [courseStartTime, setCourseStartTime] = useState("");
    const [courseEndTime, setCourseEndTime] = useState("");
    const [courseDays, setCourseDays] = useState("");
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
        setCourseDays("");
        setError("");
    };

    const fetchCourses = async (userId) => {
        const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", userId)
        .order("course_start_time", { ascending: true });
    
        if (error) {
            console.error("Error fetching data:", error);
            return [];
        }
        console.log("data:", data);
        return data;
    }

    const handleAddCourseSchedule = async () => {
        if (!courseName || !courseCode || !courseStartTime || !courseEndTime || !courseDays) {
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
                course_end_time: courseEndTime,
                course_days: courseDays
              },
            ]).select();
      
            if (error) {
              console.error('Error inserting course:', error);
              setError("Failed to add course. Please try again.");
              return;
            }
      
            console.log('Course added:', data);
            handleCloseDialog();
      
            const updatedCourses = await fetchCourses(42069); // Replace with the actual user ID
            setCourses(updatedCourses);

            handleCloseDialog();
          } catch (error) {
            console.error('Unexpected error:', error);
            setError("Unexpected error occurred. Please try again.");
          }
        
    }

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchCourses(42069); // hardcoded with test user
            setCourses(data);
          };
          loadData();
    }, []);
    
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
                    <Typography variant="body2">Code: {course.course_code}</Typography>
                    <Typography variant="h6">{course.course_name}</Typography>
                    <Typography variant="body2">Start Time: {course.course_start_time}</Typography>
                    <Typography variant="body2">End Time: {course.course_end_time}</Typography>
                    <Typography variant="body2">Days: {course.course_days}</Typography>
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
                    label="Course Code"
                    type="text"
                    fullWidth
                    onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
                />
                <TextField
                    margin="dense"
                    label="Course Name"
                    type="text"
                    fullWidth
                    onChange={(e) => setCourseName(e.target.value)}
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
                <TextField
                    margin="dense"
                    label="Course Days"
                    type="text"
                    helperText="M T W Th F"
                    fullWidth
                    onChange={(e) => setCourseDays(e.target.value)}
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