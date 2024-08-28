import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";
import SignUp from "./SignUp";

const LoginCard = () => {

    return (
        <Box
            sx={{
                borderRadius: 2,
                backgroundColor: "#363636",
                width: "35vw",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: "white", mt: 2 }}>Sign in</Typography> 
                <TextField
                    label="Email" 
                    variant="filled" 
                    placeholder='name@drexel.edu'
                    required 
                    size= "small"
                    sx={{
                        backgroundColor: "#464646",
                        width: "60%"
                    }}/>
                <TextField 
                    label="Password" 
                    variant="filled" 
                    placeholder='password' 
                    type='password' 
                    required
                    size="small"
                    sx={{
                        backgroundColor: "#464646",
                        width: "60%",
                    }}/>
                <Button type='submit' color='primary' variant="contained" sx={{ width: "30%", mt: 1 }} >Login</Button> 
            </Box>
            <SignUp />
        </Box>
    )
}

export default LoginCard;