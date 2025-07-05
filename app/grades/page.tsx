"use client";

import React, { useState, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface GradeResult {
  id: number;
  class: string;
  grade: number;
  createdAt: string;
}

const classOptions = ["Math", "Science", "History"];

const GradesPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [gradeInput, setGradeInput] = useState<string>("");
  const [grades, setGrades] = useState<GradeResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchGrades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/grades/fetch");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch grades.");
      }
      const data = await response.json();
      setGrades(data.grades || []);
    } catch (err: any) {
      setError(err.message);
      setGrades([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGrades();
  }, [fetchGrades]);

  const handleClassChange = (event: SelectChangeEvent<string>) => {
    setSelectedClass(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const parsedGrade = parseInt(gradeInput, 10);

    if (selectedClass.trim() === "") {
      setError("Please select a class.");
      setLoading(false);
      return;
    }
    if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 100) {
      setError("Please enter a valid integer grade between 0 and 100.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/grades/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ class: selectedClass, grade: parsedGrade }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add grade.");
      }

      const data = await response.json();
      setMessage(data.message || "Grade added successfully!");
      setSelectedClass("");
      setGradeInput("");
      fetchGrades();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Grade Management
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Grade
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" variant="outlined" required>
            <InputLabel id="class-select-label">Class</InputLabel>
            <Select
              labelId="class-select-label"
              id="class-select"
              value={selectedClass}
              label="Class"
              onChange={handleClassChange}
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
            label="Grade (0-100)"
            type="number"
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            InputProps={{
              inputProps: {
                min: 0,
                max: 100,
                step: "1",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Grade"
            )}
          </Button>
        </form>
        {message && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Grades
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && error && !message && (
          <Alert severity="error">{error}</Alert>
        )}
        {!loading && grades.length === 0 && !error && (
          <Typography variant="body1" color="text.secondary">
            No grades found. Add some grades to see the table.
          </Typography>
        )}
        {!loading && grades.length > 0 && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="grades table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Date Added</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grades.map((gradeItem) => (
                  <TableRow
                    key={gradeItem.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {gradeItem.id}
                    </TableCell>
                    <TableCell>{gradeItem.class}</TableCell>
                    <TableCell>{gradeItem.grade}</TableCell>
                    <TableCell>{formatDate(gradeItem.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default GradesPage;
