import { DataGrid } from "@mui/x-data-grid";
import { pingEnum } from "../../util/VoiceChannel.util";

const tableHeaderWidth = 150;

const columns = [
  { field: "serverName", headerName: "Server Name", width: tableHeaderWidth },
  { field: "users", headerName: "Users", width: tableHeaderWidth },
  { field: "music", headerName: "Music", width: tableHeaderWidth },
  { field: "ping", headerName: "Ping", width: tableHeaderWidth },
];

const rows = [
  {
    id: 1,
    serverName: "Mallard",
    users: 9,
    music: "Jazz",
    ping: <div>help</div>,
  },
  { id: 2, serverName: "Alabio", users: 6, music: "Pop", ping: "fair" },
  { id: 3, serverName: "Canvasback", users: 3, music: "Lo-Fi", ping: "good" },
  { id: 4, serverName: "Domestic", users: 2, music: "Metal", ping: "bad" },
  {
    id: 5,
    serverName: "Swedish Blue",
    users: 8,
    music: "Orchestra",
    ping: "fair",
  },
];

const VoiceServerList = () => {
  return (
    <>
      <DataGrid rows={rows} columns={columns} />
      {/* {pingEnum.good} */}
    </>
  );
};

export default VoiceServerList;
