import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { SentimentVeryDissatisfied, SentimentNeutral, SentimentSatisfied } from '@mui/icons-material';
import { timeOptions } from '../util/Pomodoro.util';
import supabase from "../libs/supabaseAdmin";
import {useUserSessionStore} from "../stores/UserSessionStore"

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [selectedTime, setSelectedTime] = useState(25);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const user_id = useUserSessionStore((state) => state.userId);

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
      setOpenDialog(true);
    }
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimeLeft(selectedTime * 60);
  };

  const handleTimeChange = (minutes) => {
    setSelectedTime(minutes);
    setTimeLeft(minutes * 60);
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const calculateCycleCount = (rating) => {
    const baseValue = selectedTime / 5;
    let multiplier;

    if (rating === 'unhappy') {
      multiplier = 1;
    } else if (rating === 'neutral') {
      multiplier = 2;
    } else if (rating === 'happy') {
      multiplier = 3;
    }

    return baseValue * multiplier;
  };

  const handleRatingSelect = async (rating) => {
    setSelectedRating(rating);
    setOpenDialog(false);

    const cycleCount = calculateCycleCount(rating);

    const { error } = await supabase.from('pomodoro_sessions').insert([
      {
        user_id,
        cycle_count: cycleCount,
        created_at: new Date()
      }
    ]);

    if (error) {
      console.error('Error inserting session:', error);
    } else {
      console.log('Session saved successfully!');
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
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
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
            onClick={() => handleTimeChange(minutes)}
            sx={{
              backgroundColor: selectedTime === minutes ? '#79aadb' : '#1976d2',
            }}
          >
            {minutes} min
          </Button>
        ))}
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={() => {}}
        disableEscapeKeyDown 
        disableBackdropClick
      >
        <DialogTitle>Rate Your Pomodoro Session</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton color='error' onClick={() => handleRatingSelect('unhappy')}>
            <SentimentVeryDissatisfied fontSize="large" />
          </IconButton>
          <IconButton onClick={() => handleRatingSelect('neutral')}>
            <SentimentNeutral fontSize="large" />
          </IconButton>
          <IconButton color='success' onClick={() => handleRatingSelect('happy')}>
            <SentimentSatisfied fontSize="large" />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PomodoroTimer;
