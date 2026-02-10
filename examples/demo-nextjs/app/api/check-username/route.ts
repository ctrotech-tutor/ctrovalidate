// app/api/check-username/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Fake DB for demo
const DB = {
  users: ['admin', 'root', 'support', 'ctrotech'],
};

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    if (typeof username !== 'string') {
      return NextResponse.json({ ok: false, available: false }, { status: 400 });
    }
    // simulate latency
    await new Promise((r) => setTimeout(r, 350));
    const available = !DB.users.some((u) => u.toLowerCase() === username.toLowerCase());
    return NextResponse.json({ ok: true, available });
  } catch (err) {
    return NextResponse.json({ ok: false, available: false }, { status: 500 });
  }
}
