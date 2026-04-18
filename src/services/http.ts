import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export const http = axios.create({
  baseURL,
  timeout: 120_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiError extends Error {
  readonly status?: number;
  readonly detail?: unknown;

  constructor(message: string, status?: number, detail?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

function extractErrorMessage(err: AxiosError): string {
  const data = err.response?.data as
    | { detail?: unknown; message?: unknown; error?: unknown }
    | undefined;

  const detail = data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    // FastAPI-style validation errors: [{ msg, loc, type }, ...]
    const first = detail[0] as { msg?: unknown };
    if (first && typeof first.msg === 'string') return first.msg;
  }

  if (typeof data?.message === 'string') return data.message;
  if (typeof data?.error === 'string') return data.error;

  if (err.code === 'ECONNABORTED') return 'Request timed out. Please try again.';
  if (err.code === 'ERR_NETWORK') return 'Network error: could not reach the server.';

  return err.message || 'Unexpected error';
}

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = extractErrorMessage(error);
    return Promise.reject(new ApiError(message, error.response?.status, error.response?.data));
  },
);
