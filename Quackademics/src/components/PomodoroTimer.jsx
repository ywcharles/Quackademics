import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(25);

  useEffect(() => {
    let id;
    if (isRunning && timeLeft > 0) {
      id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      alert('Time is up!');
    }
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(selectedTime * 60);
    setIsRunning(true);
  };

  const handleStop = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimeLeft(0);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h4">Pomodoro Timer</Typography>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel sx={{color: 'white'}}>Time (min)</InputLabel>
        <Select 
        value={selectedTime} 
        onChange={handleTimeChange}
        sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' } }} >
          <MenuItem value={5}>5 minutes</MenuItem>
          <MenuItem value={10}>10 minutes</MenuItem>
          <MenuItem value={15}>15 minutes</MenuItem>
          <MenuItem value={25}>25 minutes</MenuItem>
          <MenuItem value={30}>30 minutes</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h5">{`${Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button variant="contained" color="secondary" onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default PomodoroTimer;
