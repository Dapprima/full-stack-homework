"use client";

import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";

import { NumberPair } from "@/types/numbers";

interface NumbersTableProps {
  pairs: NumberPair[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const TABLE_HEADERS = ["ID 1", "Number 1", "ID 2", "Number 2", "Sum"];
const NO_PAIRS_TEXT =
  "No adjacent number pairs found. Add some numbers (at least two numbers) to see the table.";
const TABLE_ARIA_LABEL = "adjacent number pairs table";
const MAX_TABLE_HEIGHT = "45vh";

const NumbersTable: React.FC<NumbersTableProps> = ({
  pairs,
  loading,
  error,
  message,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !message) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (pairs.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        {NO_PAIRS_TEXT}
      </Typography>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: MAX_TABLE_HEIGHT,
        overflowY: "auto",
      }}
    >
      <Table stickyHeader aria-label={TABLE_ARIA_LABEL}>
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pairs.map((pair) => (
            <TableRow key={pair["ID 1"]}>
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
  );
};

export default NumbersTable;
