import { Button, Popover } from "@mui/material";
import { useState } from "react";

const SpotifyOverlay = () => {
  const [anchor, setAnchor] = useState(null);

  const handleSpotifyClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleSpotifyClose = () => {
    setAnchor(null);
  };

  const openSpotify = Boolean(anchor);
  const id = open ? "spotify-popover" : undefined;

  return (
    <>
      <Button aria-describedby={id} onClick={handleSpotifyClick}>
        Spotify
      </Button>
      <Popover
        id={id}
        open={openSpotify}
        anchorEl={anchor}
        onClose={handleSpotifyClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <div>hello</div>
      </Popover>
    </>
  );
};

export default SpotifyOverlay;
