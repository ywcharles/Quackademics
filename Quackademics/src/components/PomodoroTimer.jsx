import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { timeOptions } from '../util/Pomodoro.util';

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

  const handleTimeChange = (minutes) => {
    setSelectedTime(minutes);
    if (!isRunning) {
      setTimeLeft(minutes * 60);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#615f5f',
        color: 'white',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
        {`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button variant="contained" color="secondary" onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
        {timeOptions.map((minutes) => (
          <Button
            key={minutes}
            variant="contained"
            color="primary"
            onClick={() => handleTimeChange(minutes)}
          >
            {minutes} min
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default PomodoroTimer;