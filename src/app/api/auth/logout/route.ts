import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    
    const cookieStore = await cookies();
    cookieStore.set("token", "", { expires: new Date(0), path: "/" });

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Logout failed", error: error }, { status: 500 });
  }
}
