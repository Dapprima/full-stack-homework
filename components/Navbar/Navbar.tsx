"use client";

import React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Navbar: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Full Stack App
      </Typography>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Button color="inherit" component={Link} href="/numbers">
          Numbers
        </Button>
        <Button color="inherit" component={Link} href="/grades">
          Grades
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
