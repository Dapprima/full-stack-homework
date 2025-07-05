import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Alert,
} from "@mui/material";

import { formatDate } from "@/utils/date";
import { GradeResult } from "@/types/grades";

interface GradesTableProps {
  grades: GradeResult[];
  loading: boolean;
  error: string | null;
}

const NO_GRADES_TEXT = "No grades found. Add some grades to see the table.";
const TABLE_ARIA_LABEL = "grades table";
const MAX_TABLE_HEIGHT = "40vh";
const TABLE_COLUMNS = ["ID", "Class", "Grade", "Date Added"];

const GradesTable: React.FC<GradesTableProps> = ({
  grades,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (grades.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary">
        {NO_GRADES_TEXT}
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
            {TABLE_COLUMNS.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {grades.map(({ id, class: subject, grade, createdAt }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{subject}</TableCell>
              <TableCell>{grade}</TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GradesTable;
