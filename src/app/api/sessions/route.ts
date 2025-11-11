import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/admin";

// Force Node.js runtime for firebase-admin
export const runtime = "nodejs";

export async function GET() {
  try {
    console.log("🔄 Fetching sessions from Firebase...");

    // Get current date to filter upcoming sessions
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD format

    const db = getDb();
    const sessionsRef = db.collection("sessions");
    
    const querySnapshot = await sessionsRef
      .where("date", ">=", todayStr)
      .orderBy("date", "asc")
      .get();

    console.log(`📦 Found ${querySnapshot.size} sessions`);

    const sessions = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });

    console.log(`✅ Returning ${sessions.length} sessions`);

    return NextResponse.json({
      ok: true,
      data: sessions,
    });
  } catch (error: any) {
    console.error("❌ Error fetching sessions:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Failed to fetch sessions",
      },
      { status: 500 }
    );
  }
}
