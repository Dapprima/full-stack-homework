"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/numbers", label: "Numbers" },
    { href: "/grades", label: "Grades" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Full Stack App
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Button
                key={href}
                component={Link}
                href={href}
                color={isActive ? "secondary" : "inherit"}
                variant="text"
                sx={{
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
