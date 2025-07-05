"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography, Snackbar, Alert } from "@mui/material";

import NumbersForm from "@/components/NumbersForm";
import NumbersTable from "@/components/NumbersTable";

import api from "@/constants/api";
import { NumberPair } from "@/types/numbers";

const SNACKBAR_DURATION_MS = 3000;
const PAPER_ELEVATION = 3;
const DEFAULT_SUCCESS_MESSAGE = "Number added successfully!";
const DEFAULT_FETCH_ERROR = "Failed to fetch number pairs";
const DEFAULT_ADD_ERROR = "Failed to add number";

const NumbersPage: React.FC = () => {
  const [pairs, setPairs] = useState<NumberPair[]>([]);
  const [numberInput, setNumberInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchNumberPairs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(api.numbers.fetch);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || DEFAULT_FETCH_ERROR);
      setPairs(json.pairs || []);
    } catch (err: any) {
      setError(err.message);
      setPairs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNumberPairs();
  }, [fetchNumberPairs]);

  const handleAddNumber = async (event: React.FormEvent) => {
    event.preventDefault();

    const numValue = parseInt(numberInput, 10);
    if (isNaN(numValue)) {
      setError("Please enter a valid integer.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(api.numbers.add, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: numValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || DEFAULT_ADD_ERROR);

      setMessage(data.message || DEFAULT_SUCCESS_MESSAGE);
      setNumberInput("");
      fetchNumberPairs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Number Pair Calculator
      </Typography>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3, mb: 4 }}>
        <NumbersForm
          numberInput={numberInput}
          loading={loading}
          onNumberChange={setNumberInput}
          onSubmit={handleAddNumber}
        />
      </Paper>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Numbers
        </Typography>
        <NumbersTable
          pairs={pairs}
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

export default NumbersPage;
