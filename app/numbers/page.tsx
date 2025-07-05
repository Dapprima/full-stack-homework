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

interface NumberPair {
  "ID 1": number;
  "Number 1": number;
  "ID 2": number;
  "Number 2": number;
  Sum: number;
}

const NumbersPage: React.FC = () => {
  const [numberInput, setNumberInput] = useState<string>("");
  const [pairs, setPairs] = useState<NumberPair[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchNumberPairs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/numbers/pairs");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch number pairs.");
      }
      const data = await response.json();
      setPairs(data.pairs || []);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const numValue = parseInt(numberInput, 10);

    if (isNaN(numValue)) {
      setError("Please enter a valid integer.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/numbers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: numValue }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add number.");
      }

      const data = await response.json();
      setMessage(data.message || "Number added successfully!");
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
      <Typography variant="h4" component="h1" gutterBottom>
        Number Pair Calculator
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Number
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter an Integer"
            type="number"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            InputProps={{
              inputProps: {
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
              "Add Number"
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
          Adjacent Number Pairs
        </Typography>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && error && !message && (
          <Alert severity="error">{error}</Alert>
        )}
        {!loading && pairs.length === 0 && !error && (
          <Typography variant="body1" color="text.secondary">
            No adjacent number pairs found. Add some numbers (at least two
            numbers) to see the table.
          </Typography>
        )}
        {!loading && pairs.length > 0 && (
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="adjacent number pairs table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID 1</TableCell>
                  <TableCell>Number 1</TableCell>
                  <TableCell>ID 2</TableCell>
                  <TableCell>Number 2</TableCell>
                  <TableCell>Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pairs.map((pair) => (
                  <TableRow
                    key={pair["ID 1"]}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pair["ID 1"]}
                    </TableCell>
                    <TableCell>{pair["Number 1"]}</TableCell>
                    <TableCell>{pair["ID 2"]}</TableCell>
                    <TableCell>{pair["Number 2"]}</TableCell>
                    <TableCell>{pair["Sum"]}</TableCell>
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

export default NumbersPage;
