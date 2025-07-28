"use server";

export const fetchGithubCode = async (
  repo: string,
  filePath: string,
  branch: string = "main"
): Promise<string> => {
  try {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.text();
    } else {
      throw new Error("Could not fetch snippet.");
    }
  } catch (error) {
    console.error(error);
    return "Error fetching code snippet.";
  }
};
