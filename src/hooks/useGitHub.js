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
          const targetRepos = ['deenbase-app', 'settlr', 'commit'];
          const filtered = data.filter(repo => {
            const lowerName = repo.name.toLowerCase();
            return targetRepos.some(target => lowerName.includes(target));
          });
          
          // Sort them by stars or just take them as is (already sorted by update from API)
          const sorted = filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
          setRepos(sorted);
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
