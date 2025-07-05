"use client";

import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";

import NumbersForm from "@/components/NumbersForm";
import { getBaseUrl } from "@/utils/url";
import api from "@/constants/api";

const SNACKBAR_DURATION_MS = 3000;
const DEFAULT_SUCCESS_MESSAGE = "Number added successfully!";
const DEFAULT_ADD_ERROR = "Failed to add number";

const ClientNumbersForm: React.FC = () => {
  const [numberInput, setNumberInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

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
      const absoluteUrl = `${getBaseUrl()}${api.numbers.add}`;
      const res = await fetch(absoluteUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: numValue }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || DEFAULT_ADD_ERROR);

      setMessage(data.message || DEFAULT_SUCCESS_MESSAGE);
      setNumberInput("");

      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NumbersForm
        numberInput={numberInput}
        loading={loading}
        onNumberChange={setNumberInput}
        onSubmit={handleAddNumber}
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

export default ClientNumbersForm;
