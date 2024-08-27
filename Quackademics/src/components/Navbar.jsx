import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { loginPage, navComponents } from "../util/Navbar.util";
import { Brightness3Rounded, Brightness7Rounded } from "@mui/icons-material";

function Navbar(themeMode, setThemeMode) {
  const onToggleThemeClick = () => {
    console.log("mode");
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <div>{themeMode}</div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "inherit" }}>
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
              <Button
                key={page}
                href={page.href}
                sx={{ marginLeft: "auto", color: "black" }}
                color="inherit"
              >
                {page.title}
              </Button>
            ))}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginRight: "auto",
              }}
            >
              <IconButton onClick={onToggleThemeClick}>
                {themeMode === "dark" ? (
                  <Brightness3Rounded />
                ) : (
                  <Brightness7Rounded />
                )}
              </IconButton>
              <Button href={loginPage.href} color="inherit">
                Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
