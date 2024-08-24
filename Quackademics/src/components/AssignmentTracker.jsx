import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Grid, Typography, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { columns } from '../util/AssignmentTracker.util';

const AssignmentTracker = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', status: 'To-do' });
  const [sortDirections, setSortDirections] = useState({
    'To-do': 'asc',
    'In Progress': 'asc',
    'Done': 'asc'
  });

  const addAssignment = () => {
    setAssignments([...assignments, { ...newAssignment, id: Date.now().toString() }]);
    setNewAssignment({ title: '', dueDate: '', status: 'To-do' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const sortAssignments = (status) => {
    return assignments
      .filter((assignment) => assignment.status === status)
      .sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortDirections[status] === 'asc' ? dateA - dateB : dateB - dateA;
      });
  };

  const toggleSort = (status) => {
    setSortDirections(prev => ({
      ...prev,
      [status]: prev[status] === 'asc' ? 'desc' : 'asc'
    }));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const updatedAssignments = Array.from(assignments);
    const [movedAssignment] = updatedAssignments.splice(
      updatedAssignments.findIndex(a => a.id === draggableId),
      1
    );
    movedAssignment.status = destination.droppableId;
    updatedAssignments.splice(destination.index, 0, movedAssignment);

    setAssignments(updatedAssignments);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {columns.map((status) => (
            <Grid item xs={12} sm={4} key={status}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{status}</Typography>
                <IconButton onClick={() => toggleSort(status)} size="small">
                  {sortDirections[status] === 'asc' ? <ArrowUp style={{ color: '#ffffff' }}/> : <ArrowDown style={{ color: '#ffffff' }}/>}
                </IconButton>
              </div>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ minHeight: '100px', padding: '10px', backgroundColor: '#f0f0f0' }}
                  >
                    {sortAssignments(status).map((assignment, index) => (
                      <Draggable key={assignment.id} draggableId={assignment.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              marginBottom: '10px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <CardContent>
                              <Typography variant="body1">{assignment.title}</Typography>
                              <Typography variant="body2">
                                Due: {formatDate(assignment.dueDate)}
                              </Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </div>
  );
};

export default AssignmentTracker;