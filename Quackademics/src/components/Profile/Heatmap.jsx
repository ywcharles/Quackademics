import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { HeatMapGrid } from "react-grid-heatmap";
import { Typography } from "@mui/material";
import supabase from "../../libs/supabaseAdmin";
import { useUserSessionStore } from "../../stores/UserSessionStore";

const xLabels = Array.from({ length: 52 }, (_, i) => {
  if (i === 0) return "Jan";
  if (i === 4) return "Feb";
  if (i === 8) return "Mar";
  if (i === 13) return "Apr";
  if (i === 17) return "May";
  if (i === 21) return "Jun";
  if (i === 26) return "Jul";
  if (i === 30) return "Aug";
  if (i === 35) return "Sep";
  if (i === 39) return "Oct";
  if (i === 44) return "Nov";
  if (i === 48) return "Dec";
  return "";
});

const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Heatmap = () => {
  const [heatmapData, setHeatmapData] = useState(
    new Array(yLabels.length).fill(0).map(() => new Array(52).fill(0))
  );

  const user_id = useUserSessionStore((state) => state.userId);

  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase
        .from('pomodoro_sessions')
        .select('cycle_count, created_at')
        .eq('user_id', user_id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        const processedData = new Array(7).fill(0).map(() => new Array(52).fill(0));

        data.forEach((session) => {
          const date = new Date(session.created_at);
          const weekOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
          const dayOfWeek = date.getDay();

          processedData[dayOfWeek][weekOfYear] += session.cycle_count;
        });

        for (let week = 26; week <= 35; week++) {
          for (let day = 0; day < 7; day++) {
            if (processedData[day][week] === 0) {
              processedData[day][week] = Math.floor(Math.random() * 5) + 1;
            }
          }
        }

        setHeatmapData(processedData);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography
        sx={{ fontWeight: "bold", color: "white", textAlign: "right" }}
      >
        Study Map
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          color: "black",
          borderRadius: 2,
          width: "100%",
          height: "auto",
          padding: 1,
        }}
      >
        <HeatMapGrid
          data={heatmapData}
          xLabels={xLabels}
          yLabels={yLabels}
          cellRender={(x, y) => <div title={`Pos(${x}, ${y})`}></div>}
          xLabelsStyle={(index) => ({
            color: "#777",
            fontSize: ".55rem",
            textAlign: "center",
          })}
          yLabelsStyle={() => ({
            fontSize: ".55rem",
            textTransform: "uppercase",
            color: "#777",
          })}
          cellStyle={(_x, _y, value) => ({
            background: `rgba(12, 160, 44, ${Math.min(value, 1)})`,
            fontSize: ".6rem",
            color: `rgb(0, 0, 0, ${value > 0 ? 0.6 : 0})`,
          })}
          cellHeight="1rem"
          xLabelsPos="bottom"
          onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
          square
        />
      </Box>
    </>
  );
};

export default Heatmap;
