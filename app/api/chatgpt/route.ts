import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: "AI Assistant is not enabled." },
    { status: 503 },
  )
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to send messages." },
    { status: 405 },
  )
}
