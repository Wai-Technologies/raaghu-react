import { env } from '@/core/env';
import { ApiError, type ApiErrorBody } from '@/core/types/api.types';

export interface HttpRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

function buildUrl(path: string): string {
  const base = env.apiBaseUrl.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

async function parseError(response: Response): Promise<ApiError> {
  let body: ApiErrorBody | undefined;
  try {
    body = (await response.json()) as ApiErrorBody;
  } catch {
    body = undefined;
  }
  return new ApiError(
    response.status,
    body?.message ?? response.statusText ?? 'Request failed',
    body,
  );
}

export async function httpClient<T>(path: string, options: HttpRequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(buildUrl(path), {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
