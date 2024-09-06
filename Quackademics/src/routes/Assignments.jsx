import { Box } from "@mui/material";
import AssignmentTracker from "../components/AssignmentTracker";

function Assignments() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <img
        style={{ imageRendering: "pixelated" }}
        width={500}
        height={500}
        src="/babydraw.png"
      />
      <AssignmentTracker />
    </Box>
  );
}

export default Assignments;

