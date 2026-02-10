import { NextRequest, NextResponse } from "next/server";

// Fake DB for demo purposes
const DB = {
  emails: [
    "admin@ctrotech.com",
    "support@ctrotech.com",
    "hello@ctrotech.com",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string") {
      return NextResponse.json(
        { ok: false, available: false },
        { status: 400 }
      );
    }

    // simulate network / DB latency
    await new Promise((r) => setTimeout(r, 350));

    const normalizedEmail = email.toLowerCase().trim();

    const available = !DB.emails.some(
      (e) => e.toLowerCase() === normalizedEmail
    );

    return NextResponse.json({
      ok: true,
      available,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, available: false },
      { status: 500 }
    );
  }
}
