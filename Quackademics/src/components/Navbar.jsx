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

function Navbar() {
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
              href="/dashboard/home"
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
            <Button href={loginPage.href} color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
