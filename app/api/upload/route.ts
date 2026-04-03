import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("VAPI Search requested:", body);
    
    return NextResponse.json({ success: true, message: "Search active" }, { status: 200 });
  } catch (error) {
    console.error("VAPI API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}