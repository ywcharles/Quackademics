import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Grid, Typography } from '@mui/material';

const AssignmentTracker = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', status: 'To-do' });

  const addAssignment = () => {
    setAssignments([...assignments, { ...newAssignment }]);
    setNewAssignment({ title: '', dueDate: '', status: 'To-do' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleStatusChange = (assignment, newStatus) => {
    const updatedAssignments = assignments.map((a) =>
      a === assignment ? { ...a, status: newStatus } : a
    );
    setAssignments(updatedAssignments);
  };

  const sortAssignmentsByDueDate = (status) => {
    return assignments
      .filter((assignment) => assignment.status === status)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Assignment Tracker</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Assignment Title"
                name="title"
                value={newAssignment.title}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={newAssignment.dueDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={addAssignment}>
                Add Assignment
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {['To-do', 'In Progress', 'Complete'].map((status) => (
          <Grid item xs={12} sm={4} key={status}>
            <Typography variant="h6">{status}</Typography>
            {sortAssignmentsByDueDate(status).map((assignment, index) => (
              <Card key={index} style={{ marginBottom: '10px' }}>
                <CardContent>
                  <Typography variant="body1">{assignment.title}</Typography>
                  <Typography variant="body2">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </Typography>
                  {status !== 'Complete' && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        handleStatusChange(assignment, status === 'To-do' ? 'In Progress' : 'Complete')
                      }
                      style={{ marginTop: '10px' }}
                    >
                      Move to {status === 'To-do' ? 'In Progress' : 'Complete'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AssignmentTracker;
