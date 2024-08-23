import { Box, Typography, TextField, Button, Divider} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createClient } from "@supabase/supabase-js";
import React from "react";
import { useState } from "react";
import supabase from "../libs/supabaseAdmin";



const SignUp = () => {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSignUpClickOpen = () => {
        setOpen(true);
    };

    const handleSignUpClose = () => {
        setOpen(false);
        setError('');
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();

        while (!email.endsWith('@drexel.edu')) {
            setError('Please use a valid email address (abc123@drexel.edu)');
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                    }
                }
            });

            if (error) {
                setError(error.message);
            } else {
                alert("Check your email for the verification link.");
            }

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4
            }}
        >
            <Divider variant="middle" flexItem sx={{ fontWeight: "light" }}>new to the community</Divider>
            <Button type='submit' color='primary' variant="contained" onClick={handleSignUpClickOpen} sx={{ width: "50%", mt: 4 }}>Create an account</Button> 
            <Dialog
                open={open}
                onClose={handleSignUpClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSignUpSubmit
                }}
            >
                <DialogTitle>Create an Account</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="username"
                        label="Username"
                        type=""
                        fullWidth
                        variant="standard"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type='submit' color='primary' variant="contained" sx={{ width: "100%", mt: 4 }} onClick={handleSignUpClose}>sign up</Button> 
                </DialogContent>
            </Dialog>
        </Box>
    )}


export default SignUp;