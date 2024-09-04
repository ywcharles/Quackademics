import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { loginPage, navComponents } from "../util/Navbar.util";
import NotificationPopover from "./NotificationPopover.jsx";
import { useUserSessionStore } from "../stores/UserSessionStore.js";

function Navbar() {
  const userId = useUserSessionStore((state) => state.userId);
  const setUserId = useUserSessionStore((state) => state.setUserId);
  const setLoginSuccess = useUserSessionStore((state) => state.setLoginSuccess);

  const onSignOutClick = () => {
    setLoginSuccess(false);
    setUserId("");
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
            >
              {/* TODO: add logo  */}
              <img
                style={{ width: "50px" }}
                src="https://media.npr.org/assets/img/2013/06/04/ducky062way-cc767bbdf090919d6bbbed747dd19ab45e58e309.jpg?s=1100&c=50&f=jpeg"
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
            {navComponents.map((page) => (
              <MenuItem key={page}>
                <Button href={page.href} color="inherit">
                  {page.title}
                </Button>
              </MenuItem>
            ))}
            {userId === null || userId === "" ? (
              <Button href={loginPage.href} color="inherit">
                Login
              </Button>
            ) : (
              <Button href={"/home"} color="inherit" onClick={onSignOutClick}>
                Sign Out
              </Button>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <NotificationPopover />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
