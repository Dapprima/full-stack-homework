"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { classOptions, MAX_GRADE, MIN_GRADE } from "@/constants/grades";

const FORM_TITLE = "Add New Grade";
const GRADE_LABEL = "Grade (0-100)";
const GRADE_STEP = 1;
const BUTTON_TEXT = "Add Grade";
const SELECT_LABEL_ID = "class-label";
const SELECT_LABEL_TEXT = "Class";

interface GradeFormProps {
  selectedClass: string;
  gradeInput: string;
  loading: boolean;
  onClassChange: (event: SelectChangeEvent<string>) => void;
  onGradeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const GradeForm: React.FC<GradeFormProps> = ({
  selectedClass,
  gradeInput,
  loading,
  onClassChange,
  onGradeChange,
  onSubmit,
}) => (
  <Box component="form" onSubmit={onSubmit}>
    <Typography variant="h6" gutterBottom>
      {FORM_TITLE}
    </Typography>

    <FormControl fullWidth margin="normal" required>
      <InputLabel id={SELECT_LABEL_ID}>{SELECT_LABEL_TEXT}</InputLabel>
      <Select
        labelId={SELECT_LABEL_ID}
        value={selectedClass}
        label={SELECT_LABEL_TEXT}
        onChange={onClassChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {classOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <TextField
      label={GRADE_LABEL}
      type="number"
      value={gradeInput}
      onChange={(e) => onGradeChange(e.target.value)}
      fullWidth
      margin="normal"
      required
      inputProps={{ min: MIN_GRADE, max: MAX_GRADE, step: GRADE_STEP }}
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

export default GradeForm;
