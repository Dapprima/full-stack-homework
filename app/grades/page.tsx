"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography, Snackbar, Alert } from "@mui/material";

import GradeForm from "@/components/GradeForm";
import GradesTable from "@/components/GradesTable";

import api from "@/constants/api";
import { MAX_GRADE, MIN_GRADE } from "@/constants/grades";
import { GradeResult } from "@/types/grades";

const SNACKBAR_DURATION_MS = 3000;
const PAPER_ELEVATION = 3;
const DEFAULT_SUCCESS_MESSAGE = "Grade added successfully!";
const DEFAULT_FETCH_ERROR = "Failed to fetch grades";
const DEFAULT_ADD_ERROR = "Failed to add grade";

const GradesPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [gradeInput, setGradeInput] = useState("");
  const [grades, setGrades] = useState<GradeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchGrades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(api.grades.fetch);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || DEFAULT_FETCH_ERROR);
      setGrades(json.grades || []);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedGrade = parseInt(gradeInput, 10);

    if (!selectedClass.trim()) return setError("Please select a class.");
    if (
      isNaN(parsedGrade) ||
      parsedGrade < MIN_GRADE ||
      parsedGrade > MAX_GRADE
    )
      return setError(
        `Please enter a valid grade (${MIN_GRADE}-${MAX_GRADE}).`
      );

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(api.grades.add, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class: selectedClass, grade: parsedGrade }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || DEFAULT_ADD_ERROR);

      setMessage(data.message || DEFAULT_SUCCESS_MESSAGE);
      setSelectedClass("");
      setGradeInput("");
      fetchGrades();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Grade Management
      </Typography>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3, mb: 4 }}>
        <GradeForm
          selectedClass={selectedClass}
          gradeInput={gradeInput}
          loading={loading}
          onClassChange={(e) => setSelectedClass(e.target.value)}
          onGradeChange={setGradeInput}
          onSubmit={handleSubmit}
        />
      </Paper>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Grades
        </Typography>
        <GradesTable
          grades={grades}
          loading={loading}
          error={error}
          message={message}
        />
      </Paper>

      <Snackbar
        open={!!(message || error)}
        autoHideDuration={SNACKBAR_DURATION_MS}
        onClose={() => {
          setMessage(null);
          setError(null);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={message ? "success" : "error"}
          onClose={() => {
            setMessage(null);
            setError(null);
          }}
          sx={{ width: "100%" }}
        >
          {message || error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GradesPage;
