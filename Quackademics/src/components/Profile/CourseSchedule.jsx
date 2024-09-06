import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import supabase from "../../libs/supabaseAdmin";
import { useUserSessionStore } from "../../stores/UserSessionStore";

const CourseSchedule = () => {
  const userId = useUserSessionStore((state) => state.userId);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseStartTime, setCourseStartTime] = useState("");
  const [courseEndTime, setCourseEndTime] = useState("");
  const [courseDays, setCourseDays] = useState("");
  const [error, setError] = useState("");

  const handleOpenDialog = (course = null, isEditMode = false) => {
    if (course && isEditMode) {
      setEditMode(true);
      setCurrentCourseId(course.course_id);
      setCourseName(course.course_name);
      setCourseCode(course.course_code);
      setCourseStartTime(course.course_start_time);
      setCourseEndTime(course.course_end_time);
      setCourseDays(course.course_days);
    } else {
      setEditMode(false);
      setCourseName("");
      setCourseCode("");
      setCourseStartTime("");
      setCourseEndTime("");
      setCourseDays("");
    }
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
  };

  const handleSaveCourse = async () => {
    if (
      !courseName ||
      !courseCode ||
      !courseStartTime ||
      !courseEndTime ||
      !courseDays
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      if (editMode) {
        const { data, error } = await supabase
          .from("courses")
          .update({
            course_name: courseName,
            course_code: courseCode,
            course_start_time: courseStartTime,
            course_end_time: courseEndTime,
            course_days: courseDays,
          })
          .eq("course_id", currentCourseId)
          .select();

        if (error) {
          console.error("Error updating course:", error);
          setError("Failed to update course. Please try again.");
          return;
        }

        console.log("Course updated:", data);
      } else {
        const { data, error } = await supabase
          .from("courses")
          .insert([
            {
              user_id: userId, // Replace with the actual user id if available
              course_name: courseName,
              course_code: courseCode,
              course_start_time: courseStartTime,
              course_end_time: courseEndTime,
              course_days: courseDays,
            },
          ])
          .select();

        if (error) {
          console.error("Error inserting course:", error);
          setError("Failed to add course. Please try again.");
          return;
        }

        console.log("Course added:", data);
      }
      handleCloseDialog();
      const updatedCourses = await fetchCourses(userId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Unexpected error occurred. Please try again.");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("course_id", courseId);

      if (error) {
        console.error("Error deleting course:", error);
        setError("Failed to delete course. Please try again.");
        return;
      }

      console.log("Course deleted:", courseId);
      const updatedCourses = await fetchCourses(userId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCourses(userId);
      setCourses(data);
    };
    loadData();
  }, []);

  return (
    <>
      <Typography
        sx={{ fontWeight: "bold", color: "white", mt: 2, textAlign: "right" }}
      >
        Course Schedule
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#615f5f",
          color: "white",
          borderRadius: 2,
          width: "100%",
          height: "fit-content",
          p: "14px",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "82%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            overflowY: "auto",
          }}
        >
          {courses.map((course) => (
            <Card
              key={course.id}
              sx={{
                backgroundColor: "#424242",
                color: "white",
                borderRadius: 2,
                width: "fit-content",
                pt: 1,
                pb: 1,
                pr: 2,
                pl: 2,
                overflow: "visible",
              }}
            >
              {/* Box for per course card */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography variant="body2">{course.course_code}</Typography>
                  <Typography variant="h6">{course.course_name}</Typography>
                  <Typography variant="body2">
                    Start Time: {course.course_start_time}
                  </Typography>
                  <Typography variant="body2">
                    End Time: {course.course_end_time}
                  </Typography>
                  <Typography variant="body2">{course.course_days}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      handleOpenDialog(course, true);
                    }}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteCourse(course.course_id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            color: "white",
            width: "95%",
            borderRadius: 2,
            mb: 1,
          }}
          onClick={handleOpenDialog}
        >
          add a course
        </Button>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>
            {editMode ? "Edit Course" : "Add a New Course"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Course Code"
              type="text"
              fullWidth
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
            />
            <TextField
              margin="dense"
              label="Course Name"
              type="text"
              fullWidth
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Course Start Time"
              helperText="HH:mm AM/PM"
              type="time"
              fullWidth
              value={courseStartTime}
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
              value={courseEndTime}
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
              value={courseDays}
              onChange={(e) => setCourseDays(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSaveCourse}
              color="primary"
              variant="contained"
            >
              {editMode ? "Save Changes" : "Add Course"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default CourseSchedule;
