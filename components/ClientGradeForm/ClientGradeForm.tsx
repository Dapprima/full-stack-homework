"use client";

import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

import GradeForm from "@/components/GradeForm";
import { getBaseUrl } from "@/utils/url";
import api from "@/constants/api";
import { MAX_GRADE, MIN_GRADE } from "@/constants/grades";

const SNACKBAR_DURATION_MS = 3000;
const DEFAULT_SUCCESS_MESSAGE = "Grade added successfully!";
const DEFAULT_ADD_ERROR = "Failed to add grade";

const ClientGradeForm: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [gradeInput, setGradeInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedGrade = parseInt(gradeInput, 10);

    if (!selectedClass.trim()) {
      return setError("Please select a class.");
    }

    if (
      isNaN(parsedGrade) ||
      parsedGrade < MIN_GRADE ||
      parsedGrade > MAX_GRADE
    ) {
      return setError(
        `Please enter a valid grade (${MIN_GRADE}-${MAX_GRADE}).`
      );
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const absoluteUrl = `${getBaseUrl()}${api.grades.add}`;
      const res = await fetch(absoluteUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class: selectedClass, grade: parsedGrade }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || DEFAULT_ADD_ERROR);
      }

      setMessage(data.message || DEFAULT_SUCCESS_MESSAGE);
      setSelectedClass("");
      setGradeInput("");

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GradeForm
        selectedClass={selectedClass}
        gradeInput={gradeInput}
        loading={loading}
        onClassChange={(e) => setSelectedClass(e.target.value)}
        onGradeChange={setGradeInput}
        onSubmit={handleSubmit}
      />

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
    </>
  );
};

export default ClientGradeForm;
