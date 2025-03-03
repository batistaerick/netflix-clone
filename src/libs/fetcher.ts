export default async function fetcher<T>(url: string): Promise<T> {
  return await fetch(url).then(
    (response: Response): Promise<T> => response.json()
  );
}
