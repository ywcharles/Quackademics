import { Box, Button } from "@mui/material";
import VoiceServerList from "../components/VoiceChannel/VoiceServerList";
import { useVoiceChannelStore } from "../stores/VoiceChannelStore";

const VoiceChannel = () => {
  const serverName = useVoiceChannelStore((state) => state.serverName);
  return (
    <>
      <Box>Join a Voice Channel to Study with Others!</Box>
      <Box sx={{ backgroundColor: "black" }} height={"100%"} width={"100%"}>
        <VoiceServerList />
      </Box>
      <Box>
        <Button>Join {serverName}</Button>
      </Box>
    </>
  );
};

export default VoiceChannel;
