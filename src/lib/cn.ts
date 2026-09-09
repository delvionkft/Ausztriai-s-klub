/** Minimal className összefűző — nincs szükség extra függőségre. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
