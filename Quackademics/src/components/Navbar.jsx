import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { loginPage, profilePage, navComponents } from "../util/Navbar.util";
import NotificationPopover from "./NotificationPopover.jsx";
import { useUserSessionStore } from "../stores/UserSessionStore.js";

function Navbar() {
  const userId = useUserSessionStore((state) => state.userId);
  const setUserId = useUserSessionStore((state) => state.setUserId);
  const setLoginSuccess = useUserSessionStore((state) => state.setLoginSuccess);

  const onSignOutClick = () => {
    setLoginSuccess(false);
    setUserId(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <IconButton
              sx={{ mr: 2 }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="nav"
              href="/Home"
            >
              <img
                style={{ width: "50px", imageRendering: "pixelated" }}
                src="/babyboy.png"
              />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              QUACKADEMICS
            </Typography>

            {/* Left-aligned elements */}
            {userId &&
              navComponents.map((page) => (
                <MenuItem key={page}>
                  <Button href={page.href} color="inherit">
                    {page.title}
                  </Button>
                </MenuItem>
              ))}

            <Box sx={{ flexGrow: 1 }} />

            {userId === null || userId === "" ? (
              <Button href={loginPage.href} color="inherit">
                Login
              </Button>
            ) : (
              <>
                <Button href={profilePage.href} color="inherit">
                  Profile
                </Button>
                <Button href={"/home"} color="inherit" onClick={onSignOutClick}>
                  Sign Out
                </Button>
              </>
            )}
            {userId && <NotificationPopover />}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
