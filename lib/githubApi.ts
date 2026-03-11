export const fetchGitHubContributions = async () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const today = new Date();

  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  if (!token) {
    throw new Error("GitHub token is missing! Add NEXT_PUBLIC_GITHUB_TOKEN to .env.local, or use the /api/github route with GITHUB_TOKEN.");
  }
  const login = (username || "").trim() || "Atishay8192261";

  const query = JSON.stringify({
    query: `
      query {
        user(login: "${login}") {
          contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${today.toISOString()}") {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `,
  });

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: query,
  });

  const data = await response.json();

  if (!response.ok || data.errors) {
    throw new Error(`GitHub API error: ${data.errors?.[0]?.message || response.statusText}`);
  }

  interface Week {
    contributionDays: {
      date: string;
      contributionCount: number;
    }[];
  }

  const allDays = data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week: Week) => week.contributionDays
  );

  console.log("All Contribution Days:", allDays); // Debugging log

  return allDays.map((day: { contributionCount: number }) => day.contributionCount);
};
