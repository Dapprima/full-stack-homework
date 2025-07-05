import { Box, Paper, Typography } from "@mui/material";

import ClientGradeForm from "@/components/ClientGradeForm";
import GradesTable from "@/components/GradesTable";
import { getBaseUrl } from "@/utils/url";
import api from "@/constants/api";
import { GradeResult } from "@/types/grades";

const PAPER_ELEVATION = 3;
const DEFAULT_FETCH_ERROR = "Failed to fetch grades";

const getGrades = async (): Promise<{
  grades: GradeResult[];
  error: string | null;
}> => {
  try {
    const res = await fetch(`${getBaseUrl()}${api.grades.fetch}`, {
      cache: "no-store",
    });
    const json = await res.json();

    if (!res.ok) {
      return { grades: [], error: json.error || DEFAULT_FETCH_ERROR };
    }
    return { grades: json.grades || [], error: null };
  } catch (err: any) {
    console.error("Server-side fetch error:", err);
    return { grades: [], error: err.message || DEFAULT_FETCH_ERROR };
  }
};

const GradesPage = async () => {
  const { grades, error: initialFetchError } = await getGrades();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Grade Management
      </Typography>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3, mb: 4 }}>
        <ClientGradeForm />
      </Paper>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Grades
        </Typography>
        <GradesTable
          grades={grades}
          error={initialFetchError}
          loading={false}
        />
      </Paper>
    </Box>
  );
};

export default GradesPage;
