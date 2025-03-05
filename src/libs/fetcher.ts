interface FetcherArgs<T> {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  body?: T;
}

async function fetcher<TResponse, TBody = TResponse>({
  url,
  method = 'GET',
  body,
}: FetcherArgs<TBody>): Promise<TResponse> {
  const response: Response = await fetch(`/api/${url}`, {
    method,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('');
  }
  return response.json();
}

export async function postFetcher<TResponse, TBody = TResponse>(
  url: string,
  body: TBody
): Promise<TResponse> {
  return await fetcher({ url, method: 'POST', body });
}

export async function getFetcher<T>(url: string): Promise<T> {
  return await fetcher({ url });
}

export async function deleteFetcher<TResponse, TBody = TResponse>(
  url: string,
  body: TBody
): Promise<TResponse> {
  return await fetcher({ url, method: 'DELETE', body });
}
