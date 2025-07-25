import React, { useEffect, useState } from "react";

type Props = {
  repo: string; // "owner/repo"
  filePath: string; // "src/App.tsx"
  branch?: string; // "main"
};

const GithubSnippet: React.FC<Props> = ({
  repo,
  filePath,
  branch = "main",
}) => {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCode = async () => {
      setLoading(true);
      const url = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        setCode(text);
      } else {
        setCode("Could not fetch snippet.");
      }
      setLoading(false);
    };
    fetchCode();
  }, [repo, filePath, branch]);

  return (
    <div className="bg-gray-800 rounded p-4 overflow-x-auto text-sm font-mono text-white">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

export default GithubSnippet;
