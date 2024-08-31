import React, { useState, useEffect } from 'react';
import { IconButton, Badge, Popover, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Bell } from 'lucide-react';
import supabase from "../libs/supabaseAdmin";

const user_id = 35;

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dueAssignments, setDueAssignments] = useState([]);

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
      setDueAssignments(data);
    }
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
        <Badge badgeContent={dueAssignments.length} color="error">
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
          {dueAssignments.length > 0 ? (
            dueAssignments.map((assignment) => (
              <ListItem key={assignment.assignment_id}>
                <ListItemText
                  primary={assignment.title}
                  secondary={`Due: ${assignment.due_date}`}
                />
              </ListItem>
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
