import { NextResponse } from "next/server"

interface ContributionDay {
  date: string
  contributionCount: number
}

interface Week {
  contributionDays: ContributionDay[]
}

interface ContributionCalendar {
  totalContributions: number
  weeks: Week[]
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar
  totalCommitContributions: number
  restrictedContributionsCount: number
}

interface GitHubUser {
  contributionsCollection: ContributionsCollection
}

interface GitHubResponse {
  data: {
    user: GitHubUser
  }
  errors?: Array<{
    message: string
    locations?: Array<{
      line: number
      column: number
    }>
    path?: string[]
  }>
}

export async function GET() {
  try {
    
    const token = process.env.GITHUB_TOKEN
    const username = process.env.GITHUB_USERNAME || ""

    if (!token || token.trim() === "") {
      return NextResponse.json(
        { error: "GitHub token not configured. Set GITHUB_TOKEN in .env.local (local) or Vercel Environment Variables, then redeploy." },
        { status: 500 }
      )
    }

    if (!username || username.trim() === "") {
      return NextResponse.json(
        { error: "GitHub username not configured. Set GITHUB_USERNAME in .env.local or Vercel Environment Variables (e.g. your GitHub username)." },
        { status: 500 }
      )
    }

    const today = new Date()
    const from = new Date(today)
    from.setFullYear(from.getFullYear() - 1)
    from.setDate(from.getDate() + 1) // GitHub includes start date

    const query = {
      query: `
        query {
          user(login: "${username.trim()}") {
            contributionsCollection(from: "${from.toISOString()}", to: "${today.toISOString()}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
              totalCommitContributions
              restrictedContributionsCount
            }
          }
        }
      `,
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })

    const data: GitHubResponse = await response.json()

    if (!response.ok || data.errors) {
      const message = data.errors?.[0]?.message ?? (response.status === 401 ? "Invalid or expired token" : "Failed to fetch GitHub data")
      console.error("GitHub API error:", response.status, data.errors)
      return NextResponse.json({ error: message }, { status: response.ok ? 500 : response.status })
    }

    const collection = data.data.user.contributionsCollection
    const contributionData = collection.contributionCalendar

    const contributions: number[] = []
    contributionData.weeks.forEach((week: Week) => {
      week.contributionDays.forEach((day: ContributionDay) => {
        contributions.push(day.contributionCount)
      })
    })

    return NextResponse.json({
      contributions,
      totalContributions: contributionData.totalContributions,
      restrictedCount: collection.restrictedContributionsCount,
      publicContributions: collection.totalCommitContributions,
      startDate: contributionData.weeks[0]?.contributionDays[0]?.date || from.toISOString().split("T")[0],
    })
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
