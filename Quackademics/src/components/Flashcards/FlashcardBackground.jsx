import { Box, Typography} from "@mui/material";

const FlashcardBackground = () => {

    return (
        <Box>
            <Box
                sx={{
                    position: "absolute", 
                    height: "65vh",
                    width: "57vw",
                    top: "13%",
                    backgroundColor: "#615f5f",
                    border: "2px solid black",
                    padding: 1,
                    zIndex: 2,
                    left: 50,
                }}
            />
            <Box
                sx={{
                    position: "absolute", 
                    height: "65vh",
                    width: "57vw",
                    top: "13%",
                    backgroundColor: "#615f5f",
                    border: "2px solid black",
                    padding: 1,
                    zIndex: 1,
                    left: 100,
                }}
            />
        </Box>
    );
};

export default FlashcardBackground;

