"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

const FORM_TITLE = "Add New Number";
const INPUT_LABEL = "Enter an Integer";
const BUTTON_TEXT = "Add Number";

interface NumbersFormProps {
  numberInput: string;
  loading: boolean;
  onNumberChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const NumbersForm: React.FC<NumbersFormProps> = ({
  numberInput,
  loading,
  onNumberChange,
  onSubmit,
}) => (
  <Box component="form" onSubmit={onSubmit}>
    <Typography variant="h6" gutterBottom>
      {FORM_TITLE}
    </Typography>

    <TextField
      label={INPUT_LABEL}
      type="number"
      value={numberInput}
      onChange={(e) => onNumberChange(e.target.value)}
      fullWidth
      margin="normal"
      required
      inputProps={{ step: 1 }}
      disabled={loading}
    />

    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
      sx={{ mt: 2 }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : BUTTON_TEXT}
    </Button>
  </Box>
);

export default NumbersForm;
