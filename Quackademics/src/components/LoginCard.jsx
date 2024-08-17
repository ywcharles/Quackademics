import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import React from "react";

const LoginCard = () => {
    return (
        <Box
            sx={{
                borderRadius: 2,
                backgroundColor: "#363636",
                width: "35vw",
                // height: "60vh",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8
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
                    id="filled-basic" 
                    label="Email" 
                    variant="filled" 
                    placeholder='name@drexel.edu'
                    required 
                    size= "small"
                    sx={{
                        width: "60%"
                    }}/>
                <TextField 
                    id="filled-basic" 
                    label="Password" 
                    variant="filled" 
                    placeholder='password' 
                    type='password' 
                    required
                    size="small"
                    sx={{
                        width: "60%",
                    }}/>
                <Button type='submit' color='primary' variant="contained" sx={{ width: "30%", mt: 1 }} >Login</Button> 
            </Box>
            
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
                <Divider>new to the community</Divider>
                <Button type='submit' color='primary' variant="contained" sx={{ width: "50%", mt: 4 }}>Create an account</Button> 
            </Box>
        </Box>
        
    )
}

export default LoginCard;