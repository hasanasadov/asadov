export function isAuthenticated(): boolean {
  return (
    typeof window !== "undefined" &&
    localStorage.getItem("authenticated") === "true"
  );
}
