import { Box } from "@mui/material";
import VoiceServerList from "../components/VoiceChannel/VoiceServerList";

const VoiceChannel = () => {
  return (
    <Box sx={{ backgroundColor: "white" }} height={"100%"} width={"100%"}>
      <VoiceServerList />
    </Box>
  );
};

export default VoiceChannel;
