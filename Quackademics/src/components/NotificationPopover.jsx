import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Popover, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Bell } from 'lucide-react';
import supabase from "../libs/supabaseAdmin";

const user_id = 35;

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dueAssignments, setDueAssignments] = useState({});

  useEffect(() => {
    fetchDueAssignments();
  }, []);

  const fetchDueAssignments = async () => {
    const currentDate = new Date();
    const nextWeekDate = new Date();
    nextWeekDate.setDate(currentDate.getDate() + 7);

    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('user_id', user_id)
      .gte('due_date', currentDate.toISOString().split('T')[0])
      .lte('due_date', nextWeekDate.toISOString().split('T')[0]);

    if (error) {
      console.error('Error fetching due assignments:', error);
    } else {
      const groupedAssignments = groupAssignmentsByDay(data);
      setDueAssignments(groupedAssignments);
    }
  };

  const groupAssignmentsByDay = (assignments) => {
    return assignments.reduce((acc, assignment) => {
      const dueDate = new Date(assignment.due_date);
      const dayOfWeek = dueDate.toLocaleDateString('en-US', { weekday: 'long' });

      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = [];
      }
      acc[dayOfWeek].push(assignment);
      return acc;
    }, {});
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={Object.keys(dueAssignments).reduce((sum, day) => sum + dueAssignments[day].length, 0)} color="error">
          <Bell />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography variant="h6" style={{ padding: '10px' }}>Upcoming Assignments</Typography>
        <List>
          {Object.keys(dueAssignments).length > 0 ? (
            Object.keys(dueAssignments).map((day) => (
              <React.Fragment key={day}>
                <Typography variant="subtitle1" style={{ paddingLeft: '10px', paddingTop: '10px' }}>{day}:</Typography>
                {dueAssignments[day].map((assignment) => (
                  <ListItem key={assignment.assignment_id}>
                    <ListItemText
                      primary={assignment.title}
                      secondary={`Due: ${assignment.due_date}`}
                    />
                  </ListItem>
                ))}
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body2" style={{ padding: '10px' }}>No assignments due in the next 7 days.</Typography>
          )}
        </List>
      </Popover>
    </>
  );
};

export default NotificationPopover;
