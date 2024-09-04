import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Popover, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { Bell } from 'lucide-react';
import supabase from "../libs/supabaseAdmin";
import {useUserSessionStore} from "../stores/UserSessionStore";

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dueAssignments, setDueAssignments] = useState({});
  const user_id = useUserSessionStore((state) => state.userId);

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
    const sortedAssignments = assignments.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

    return sortedAssignments.reduce((acc, assignment) => {
      const dueDate = new Date(assignment.due_date + 'T00:00:00');
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
        PaperProps={{
          style: {
            width: '300px',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Upcoming Assignments</Typography>
        <List>
          {Object.keys(dueAssignments).length > 0 ? (
            Object.keys(dueAssignments).map((day) => (
              <Box key={day} style={{ marginBottom: '10px' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#333' }}>{day}:</Typography>
                <Divider style={{ margin: '5px 0' }} />
                {dueAssignments[day].map((assignment) => (
                  <ListItem key={assignment.assignment_id} disableGutters>
                    <ListItemText
                      primary={assignment.title}
                      secondary={`Due: ${assignment.due_date}`}
                      primaryTypographyProps={{ style: { fontSize: '14px', fontWeight: '500', color: '#555' } }}
                      secondaryTypographyProps={{ style: { fontSize: '12px', color: '#888' } }}
                    />
                  </ListItem>
                ))}
              </Box>
            ))
          ) : (
            <Typography variant="body2" style={{ padding: '10px', color: '#888' }}>No assignments due in the next 7 days.</Typography>
          )}
        </List>
      </Popover>
    </>
  );
};

export default NotificationPopover;
