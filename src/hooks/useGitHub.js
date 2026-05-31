import { useState, useEffect } from 'react';

export default function useGitHub(username) {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          const nonForked = data.filter(repo => repo.fork === false);
          const sorted = nonForked.sort((a, b) => b.stargazers_count - a.stargazers_count);
          setRepos(sorted.slice(0, 6));
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { repos, isLoading, error };
}
