import * as React from "react";
import Box from "@mui/material/Box";
import { HeatMapGrid } from "react-grid-heatmap";

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * 5 + 5))
  );

const Heatmap = () => {
  return (
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
        padding: 2,
      }}
    >
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellRender={(x, y) => (
          <div title={`Pos(${x}, ${y})`}></div>
        )}
        xLabelsStyle={(index) => ({
          color: index % 2 ? "transparent" : "#777",
          fontSize: ".65rem",
        })}
        yLabelsStyle={() => ({
          fontSize: ".65rem",
          textTransform: "uppercase",
          color: "#777",
        })}
        cellStyle={(_x, _y, ratio) => ({
          background: `rgb(12, 160, 44, ${ratio})`,
          fontSize: ".7rem",
          color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`,
        })}
        cellHeight="1.5rem"
        xLabelsPos="bottom"
        onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
        square
      />
    </Box>
  );
};

export default Heatmap;