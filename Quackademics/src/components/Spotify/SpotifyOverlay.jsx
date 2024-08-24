import { Button, Popover } from "@mui/material";
import { useState, useEffect } from "react";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
// const TOKEN = import.meta.env.VITE_SPOTIFY_TOKEN;

const REDIRECT_URI = "http://localhost:80";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const RESPONSE_TYPE = "token";

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

  const [token, setToken] = useState("");

  // check if hash or token is saved to localStorage
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // if token not found, check if we have a hash
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    // if token stored, continue by setting our token state var
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

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
        anchorOrigin={{ vertical: "top", horizontal: "bottom" }}
      >
        <div>
          <iframe
            style="border-radius:12px"
            src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <h1>Spotify Web Playback</h1>
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </div>
      </Popover>
    </>
  );
};

export default SpotifyOverlay;
