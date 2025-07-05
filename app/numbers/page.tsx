import { Box, Paper, Typography } from "@mui/material";

import ClientNumbersForm from "@/components/ClientNumbersForm";
import NumbersTable from "@/components/NumbersTable";
import { getBaseUrl } from "@/utils/url";
import api from "@/constants/api";
import { NumberPair } from "@/types/numbers";


const PAPER_ELEVATION = 3;
const DEFAULT_FETCH_ERROR = "Failed to fetch number pairs";

const getNumberPairs = async (): Promise<{
  pairs: NumberPair[];
  error: string | null;
}> => {
  try {
    const res = await fetch(`${getBaseUrl()}${api.numbers.fetch}`, {
      cache: "no-store",
    });
    const json = await res.json();

    if (!res.ok) {
      return { pairs: [], error: json.error || DEFAULT_FETCH_ERROR };
    }
    return { pairs: json.pairs || [], error: null };
  } catch (err: any) {
    console.error("Server-side fetch error:", err);
    return { pairs: [], error: err.message || DEFAULT_FETCH_ERROR };
  }
};

const NumbersPage = async () => {
  const { pairs, error: initialFetchError } = await getNumberPairs();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Number Pair Calculator
      </Typography>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3, mb: 4 }}>
        <ClientNumbersForm />
      </Paper>

      <Paper elevation={PAPER_ELEVATION} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          All Number Pairs
        </Typography>
        <NumbersTable pairs={pairs} error={initialFetchError} loading={false} />
      </Paper>
    </Box>
  );
};

export default NumbersPage;
