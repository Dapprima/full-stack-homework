"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const GradesPage: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Grade Management and Analysis
      </Typography>
      <p>This is the Grades page.</p>
    </Box>
  );
};

export default GradesPage;
